import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ReportedItem } from 'src/app/models/reported-item';
import { DataService } from 'src/app/services/data.service';
import { ItemService } from 'src/app/services/item.service';
import { ItemSearchModalComponent } from 'src/app/components/item-search-modal/item-search-modal.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  readonly INSTOCK_ITEM_TYPE = ReportedItem.INSTOCK_TYPE;
  readonly OUTSTOCK_ITEM_TYPE = ReportedItem.OUTSTOCK_TYPE;

  public selectedStore: Store;
  public reportedItems: ReportedItem[];

  private userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private dataService: DataService,
    private itemService: ItemService) { }

  ngOnInit() {
    this.selectedStore = new Store();
    this.selectedStore.name = this.route.snapshot.paramMap.get('storeName');
    this.selectedStore.address = this.route.snapshot.paramMap.get('storeAddress');
    this.selectedStore.storeId = this.route.snapshot.paramMap.get('storeId');
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.reportedItems = [];

    this.itemService.load(this.userId);
  }

  async showModal(state: string) {
    const modal = await this.modalCtrl.create({
      component: ItemSearchModalComponent,
      componentProps: {
        data: state
      }
    })
    await modal.present();
    modal.onDidDismiss().then(res => {
      if (res.data) {
        console.log('adding to report', res.data)
        const item: ReportedItem = res.data;
        this.reportedItems.push(item);
      }
    });
  }

  removeItem(item: ReportedItem) {
    const index = this.reportedItems.indexOf(item)
    if (index > -1) {
      this.reportedItems.splice(index, 1);
    }
  }

  reportItems() {
    const instockItems: string[] = [];
    const outstockItems: string[] = [];
    this.reportedItems.forEach(item => {
      if (item.type === this.INSTOCK_ITEM_TYPE) {
        instockItems.push(item.name);
      } else {
        outstockItems.push(item.name);
      }
    });
    this.dataService.reportItems(this.userId, this.selectedStore.storeId, instockItems, outstockItems)
      .subscribe(_ => {
        this.presentToast(`Thanks! You reported ${instockItems.length} in stock and ${outstockItems.length} out of stock item(s)!`, 'success');
        this.router.navigate(['/home']);
      }, err => {
        console.error(err);
        this.presentToast('Something went wrong! The items couldn\'t be reported. Please try again.', 'danger');
      });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color,
      duration: 5000
    });
    toast.present();
  }
}
