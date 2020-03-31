import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
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
  public storeZipCode = "";
  public stores: Store[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    public popoverController: PopoverController) { }

  ngOnInit() {
  }

  checkZipCodePopOver(ev: any) {
    if(!this.storeZipCode.match(this.ZIP_CODE_REGEX)) {
      return this.presentPopover(ev);
    } else {
      this.populateStoreList();
    }
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

  populateStoreList(): void {
    console.log(this.storeZipCode.match(this.ZIP_CODE_REGEX)[0].length > 0)
    if(this.storeName.length > 0 && this.storeZipCode.match(this.ZIP_CODE_REGEX)[0].length > 0) {
      this.dataService.getStores(this.storeName, this.storeZipCode).subscribe((stores: Store[]) =>{
        console.log(stores);
        this.stores.concat(stores);
      });
    }
    console.log(this.stores);
  }

  onStoreSelected(selectedStore: Store) {
    this.router.navigate(['/item'], { state: { data: selectedStore } });
  }

}
