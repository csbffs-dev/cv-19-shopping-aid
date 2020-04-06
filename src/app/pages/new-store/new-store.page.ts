import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address';

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

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.store = new Store();
    this.store.address = new Address();
    this.states = ['TX','WA'];
  }

  addStore(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.dataService.addStore(this.store, userId).subscribe(response => {
      this.router.navigate(['/home']);
    });
  }
}
