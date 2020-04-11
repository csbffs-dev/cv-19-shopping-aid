import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NewStorePage } from '../new-store/new-store.page';
import { ModalController, ToastController } from '@ionic/angular';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';

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
    if(this.isInitialState){
      this.isInitialState = false;
    }
  }

  onStoreSelected(selectedStore: Store) {
    const data = { 
      storeName: selectedStore.name,
      storeAddress: selectedStore.address,
      storeId: selectedStore.storeId }
    this.router.navigate(['/item', data]);
  }

  async showAddStoreModal() {
    const modal = await this.modalCtrl.create({
      component: NewStorePage,
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop(), // Get the top-most ion-modal
      componentProps: {
        'userId': this.route.snapshot.paramMap.get('userId'),
      }
    });

    modal.onDidDismiss().then(modalData => {
      if(modalData.data) {
        // returned storeId from modal, left here in case of future usage
        // const storeId = modalData.data;
        this.presentToast('New store has been added.', '');
        this.populateStoreList(this.userId);
        setTimeout(() => {
          this.filterStoresByCity();
        }, 500);
      } else {
        this.presentToast('No store added.', 'danger');
      }
    });

    return await modal.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.present();
  }
}
