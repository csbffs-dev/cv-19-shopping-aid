import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Store } from '../models/store';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
// Service class for CV-19 Shopping Aid API Calls
export class DataService {
  readonly SERVER_URL= "http://localhost:8080/";
  storesData = new Subject<Store[]>();
  constructor(private http: HttpClient) { }

  getStores(storeName: string, zipCode: string): Subject<Store[]> {
    console.log('in data service: ')
    this.storesData.next([new Store('269cf858-8f14-4022-99c6-a9ca8e4f57a1', 'Whole Foods Market', new Address('2210 Westlake Ave', 'Seattle', 'WA', 98121))]);
    return this.storesData;
  }
}
