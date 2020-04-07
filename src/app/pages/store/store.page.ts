import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  public readonly ZIP_CODE_REGEX = '^[0-9]{5}(?:-[0-9]{4})?$';

  public storeName = "";
  public storeCity = "";
  public stores: Store[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    public popoverController: PopoverController) { }

  ngOnInit() {
    this.populateStoreList(this.route.snapshot.paramMap.get('userId'));
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      mode: 'ios',
      animated: true,
      showBackdrop: true,
      cssClass: '--background-color: black;',
      componentProps: { data: 'Invalid Zip Code Entered.'}
    });
    return await popover.present();
  }

  populateStoreList(userId: string): void {
    this.dataService.getStores(userId).subscribe((res: Store[]) => {
      res.forEach(store => this.stores.push(store));
    }, err => {
      console.error(err);
    });
  }

  onStoreSelected(selectedStore: Store) {
    const data = { 
      storeName: selectedStore.name,
      storeAddress: selectedStore.address,
      storeId: selectedStore.storeId }
    this.router.navigate(['/item', data]);
  }

}
