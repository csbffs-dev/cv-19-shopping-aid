import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchedItem } from 'src/app/models/searched-item';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-item-data-modal',
  templateUrl: './item-data-modal.component.html',
  styleUrls: ['./item-data-modal.component.scss'],
})
export class ItemDataModalComponent implements OnInit {
  @Input() query: string;
  @Input() userId: string;
  public itemData: SearchedItem[];

  constructor(
    private modalCtrl: ModalController,
    private searchService: SearchService
  ) { 
    this.itemData = [];
  }

  ngOnInit() {
    this.searchService.getItemData(this.userId, this.query).subscribe((res: SearchedItem[]) => {
      this.itemData = res;
    }, err => {
      console.error(err);
    });
  }

  async close() {
    await this.modalCtrl.dismiss();
  }
}
