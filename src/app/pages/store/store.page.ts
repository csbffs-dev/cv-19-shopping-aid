import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { StoreService } from 'src/app/services/store.service'
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { NewStoreModalComponent } from 'src/app/components/new-store-modal/new-store-modal.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  private userId: string;
  public storeName = "";
  public storeCity = "";
  public stores: Store[];
  public filteredStores: Store[];
  public isInitialState = true;

  constructor(
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.stores = [];
    this.filteredStores = [];
    this.userId = this.route.snapshot.paramMap.get('userId')
    this.populateStoreList(this.userId);
  }

  populateStoreList(userId: string): void {
    this.storeService.getStores(userId).subscribe((res: Store[]) => {
      this.stores = res;
      console.log("Loaded", this.stores.length, "stores.")
    }, err => {
      console.error(err);
    });
  }

  filterStores() {
    this.filteredStores = this.storeService.filter(this.stores, this.storeName, this.storeCity);
    if (this.filteredStores.length === 0 && this.storeName.length > 0 && this.storeCity.length > 0) {
      this.isInitialState = false;
    } else {
      this.isInitialState = true;
    }
  }

  onStoreSelected(selectedStore: Store) {
    const data = {
      storeName: selectedStore.name,
      storeAddress: selectedStore.address,
      storeId: selectedStore.storeId,
      userId: this.userId
    }
    this.router.navigate(['/item', data]);
  }

  async showAddStoreModal() {
    const modal = await this.modalCtrl.create({
      component: NewStoreModalComponent,
      componentProps: {
        userId: this.userId
      }
    });
    await modal.present();
    modal.onDidDismiss().then(res => {
      if (res.data) {
        if (res.data.error) {
          this.presentToast(`Sorry! This couldn't be added.\nReason: ${res.data.error.error}`, 'danger');
        } else {
          this.presentToast(`You added ${res.data.storeName} (${res.data.storeAddress})!`, 'success');
          this.populateStoreList(this.userId);
          setTimeout(() => {
            this.filterStores();
          }, 500);
        }
      }
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: color === 'danger' ? 10000 : 5000
    });
    toast.present();
  }
}
