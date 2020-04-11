import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  public filteredStores: Store[];

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.filteredStores = [];
    this.populateStoreList(this.route.snapshot.paramMap.get('userId'));
  }


  populateStoreList(userId: string): void {
    this.dataService.getStores(userId).subscribe((res: Store[]) => {
      this.stores = res;
    }, err => {
      console.error(err);
    });
  }

  filterStoresByName() {
    this.filteredStores = this.stores.filter(
      store => store.name.toLowerCase().indexOf(this.storeName.toLowerCase()) > -1 &&
      this.storeName !== ""
    );
  }

  filterStoresByCity() {
    this.filteredStores = this.stores.filter(
      store =>
      store.city.toLowerCase().indexOf(this.storeCity.toLowerCase()) > -1 &&
      store.name.toLowerCase().indexOf(this.storeName.toLowerCase()) > -1 &&
      this.storeCity !== ""
    );
  }

  onStoreSelected(selectedStore: Store) {
    const data = { 
      storeName: selectedStore.name,
      storeAddress: selectedStore.address,
      storeId: selectedStore.storeId }
    this.router.navigate(['/item', data]);
  }

}
