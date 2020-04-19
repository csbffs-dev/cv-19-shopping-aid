import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { NewStoreModalComponent } from 'src/app/components/new-store-modal/new-store-modal.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  public readonly ZIP_CODE_REGEX = '^[0-9]{5}(?:-[0-9]{4})?$';

  public storeName = "";
  public storeCity = "";
  private stores: Store[];
  private userId: string;
  public filteredStores: Store[];
  public isInitialState = true;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.filteredStores = [];
    this.userId = this.route.snapshot.paramMap.get('userId')
    this.populateStoreList(this.userId);
  }

  populateStoreList(userId: string): void {
    this.dataService.getStores(userId).subscribe((res: Store[]) => {
      this.stores = res;
    }, err => {
      console.error(err);
    });
  }

  filterStoresByCity() {
    this.filteredStores = this.stores.filter(
      store =>
        store.city.toLowerCase().indexOf(this.storeCity.toLowerCase()) > -1 &&
        store.name.toLowerCase().indexOf(this.storeName.toLowerCase()) > -1 &&
        this.storeCity !== ""
    );
    if (this.isInitialState) {
      this.isInitialState = false;
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
            this.filterStoresByCity();
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
