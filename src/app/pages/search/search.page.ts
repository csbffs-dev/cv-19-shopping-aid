import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemService } from 'src/app/services/item.service';
import { ItemDataModalComponent } from 'src/app/components/item-data-modal/item-data-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  items: string[];
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
  }

  ionViewDidEnter() {
    this.itemService.load(this.userId);
  }

  getItems(ev: { target: { value: string; }; }) {
    this.items = this.itemService.filter(ev.target.value);
  }

  async onItemSelected(selectedItem: string) {
    const modal = await this.modalCtrl.create({
      component: ItemDataModalComponent,
      componentProps: {
        query: selectedItem,
        userId: this.userId
      }
    });
    await modal.present();
  }
}
