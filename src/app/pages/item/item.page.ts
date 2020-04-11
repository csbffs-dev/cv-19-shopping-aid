import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { ActivatedRoute } from '@angular/router';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { PopoverController } from '@ionic/angular';
import { ReportedItem } from 'src/app/models/reported-item';

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
  
  constructor(private route: ActivatedRoute,
    public popoverController: PopoverController) { }

  ngOnInit() {
    this.selectedStore = new Store();
    this.selectedStore.name = this.route.snapshot.paramMap.get('storeName'); 
    this.selectedStore.address = this.route.snapshot.paramMap.get('storeAddress'); 
    this.selectedStore.storeId = this.route.snapshot.paramMap.get('storeId');
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
}
