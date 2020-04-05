import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Store } from '../models/store';
import { Address } from '../models/address';
import { User } from '../models/user';
import { SERVER_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
// Service class for CV-19 Shopping Aid API Calls
export class DataService {
  private serverUrl: string;
  readonly GET_USER = '/user/query';
  readonly NEW_USER = '/user/setup';
  storesData = new Subject<Store[]>();
  constructor(private http: HttpClient) { 
    this.serverUrl = isDevMode()? 'api': SERVER_URL;
    if(!isDevMode()) {
      console.log('not in dev mode');
    } else {
      console.log('in dev mode');
    }
  }

  getUser(userId: string) {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const data = { 'user_id': userId };
    return this.http.post(this.serverUrl + this.GET_USER, data, config);
  }

  signUpNewUser(user: User) {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const data = { 'first_name': user.firstName, 'last_name' : user.lastName, 'zip_code' : user.zipCode }
    return this.http.post<any>(this.serverUrl + this.NEW_USER, data, config);
  }

  getStores(storeName: string, zipCode: string): Subject<Store[]> {
    console.log('in data service: ')
    this.storesData.next([new Store('269cf858-8f14-4022-99c6-a9ca8e4f57a1', 'Whole Foods Market', new Address('2210 Westlake Ave', 'Seattle', 'WA', 98121))]);
    return this.storesData;
  }
}
