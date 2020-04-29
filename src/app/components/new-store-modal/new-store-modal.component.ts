import { Component, OnInit, Input } from '@angular/core';
import { Store } from 'src/app/models/store';
import { StoreService } from 'src/app/services/store.service';

import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-new-store-modal',
  templateUrl: './new-store-modal.component.html',
  styleUrls: ['./new-store-modal.component.scss'],
})
export class NewStoreModalComponent implements OnInit {
  @Input() userId: string;
  store: Store;

  constructor(
    private modalCtrl: ModalController,
    private dataService: StoreService
  ) {
    this.store = new Store();
  }

  ngOnInit() { }

  async addStore() {
    this.dataService.addStore(this.store, this.userId).subscribe(storeId => {
      console.log("User added a new store", storeId);
      this.modalCtrl.dismiss({ storeName: this.store.name, storeAddress: this.store.address });
    }, err => {
      console.log(err);
      this.modalCtrl.dismiss({ error: err });
    });
  }

  async close() {
    await this.modalCtrl.dismiss();
  }
}
