import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  public selectedStore: Store;
  
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.selectedStore = new Store();
    this.selectedStore.name = this.route.snapshot.paramMap.get('storeName'); 
    this.selectedStore.address = this.route.snapshot.paramMap.get('storeAddress'); 
    this.selectedStore.storeId = this.route.snapshot.paramMap.get('storeId');
  }

}
