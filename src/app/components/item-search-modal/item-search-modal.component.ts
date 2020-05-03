import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemService } from 'src/app/services/item.service';
import { ReportedItem } from 'src/app/models/reported-item';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search-modal.component.html',
  styleUrls: ['./item-search-modal.component.scss'],
})
export class ItemSearchModalComponent implements OnInit {
  @Input() data: string; // enable passing data to modal
  items: string[];

  constructor(
    private modalCtrl: ModalController,
    private itemService: ItemService
  ) { }

  async close() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() { }

  getItems(ev: { target: { value: string; }; }) {
    this.items = this.itemService.filter(ev.target.value);
  }

  async onItemSelected(selectedItem: string) {
    const item = new ReportedItem();
    item.name = selectedItem;
    item.type = this.data;
    await this.modalCtrl.dismiss(item);
  }
}
