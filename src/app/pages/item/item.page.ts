import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { PopoverController, ToastController } from '@ionic/angular';
import { ReportedItem } from 'src/app/models/reported-item';
import { DataService } from 'src/app/services/data.service';

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
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    public popoverController: PopoverController,
    public toastController: ToastController,
    private dataService: DataService) { }

  ngOnInit() {
    this.selectedStore = new Store();
    this.selectedStore.name = this.route.snapshot.paramMap.get('storeName'); 
    this.selectedStore.address = this.route.snapshot.paramMap.get('storeAddress'); 
    this.selectedStore.storeId = this.route.snapshot.paramMap.get('storeId');
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.reportedItems = [];
  }

  async presentPopover(ev: any, itemType: string) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      mode: 'ios',
      animated: true,
      showBackdrop: true,
      componentProps: { type: itemType }
    });

    popover.onDidDismiss().then(addedItem => {
      if(addedItem.data) {
        const item: ReportedItem = addedItem.data;
        this.reportedItems.push(item);
      }
    });

    return await popover.present();
  }

  removeItem(item: ReportedItem) {
    const index = this.reportedItems.indexOf(item, 0);
    if (index > -1) {
      this.reportedItems.splice(index, 1);
    }
  }

  reportItems() {
    const instockItems: string[] = [];
    const outstockItems: string[] = [];
    this.reportedItems.forEach(item => {
      if(item.type === this.INSTOCK_ITEM_TYPE) {
        instockItems.push(item.name);
      } else {
        // out stock case
        outstockItems.push(item.name);
      }
    });
    this.dataService.reportItems(this.userId, this.selectedStore.storeId, instockItems, outstockItems)
    .subscribe(_ => {
      this.presentToast(`${instockItems.length} in-stock and ${outstockItems.length} out-stock items added.`, 'success');
      this.router.navigate(['/home']);
    }, err => {
      this.presentToast('Failed to add items.  Please make sure valid items entered.', 'danger');
      console.error(err);
    });
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
