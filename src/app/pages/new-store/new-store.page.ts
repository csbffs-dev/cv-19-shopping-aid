import { Component, OnInit, Input } from '@angular/core';
import { Store } from 'src/app/models/store';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-store',
  templateUrl: './new-store.page.html',
  styleUrls: ['./new-store.page.scss'],
})
export class NewStorePage implements OnInit {
  readonly selectOptions: any = {
    header: 'State',
    subHeader: 'Select a state'
  };

  public states: string[];
  public store: Store;
  @Input() private userId: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.store = new Store();
    console.log(this.userId);
  }

  addStore(): void {
    const userId = this.navParams.get('userId');
    this.dataService.addStore(this.store, userId).subscribe(storeId => {
      this.modalCtrl.dismiss(storeId);
    });
  }

  closePage() {
    this.modalCtrl.dismiss();
  }
}
