import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '../models/store';
import { SERVER_URL } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private serverUrl: string;
  private readonly ADD_STORE = '/store/add';
  private readonly GET_STORES = '/store/query';
  private readonly REQ_HEADER = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) {
    this.serverUrl = SERVER_URL;
  }

  addStore(store: Store, userId: string) {
    const data = { user_id: userId, name: store.name, address: store.address };
    return this.http.post(this.serverUrl + this.ADD_STORE, data, this.REQ_HEADER);
  }

  getStores(userId: string): Observable<Store[]> {
    return this.http.post<Store[]>(this.serverUrl + this.GET_STORES, { user_id: userId }, this.REQ_HEADER);
  }

  filter(stores: Store[], storeNameQuery: string, storeCityQuery: string): Store[] {
    if (stores.length === 0 || storeNameQuery.length === 0 || storeCityQuery.length === 0) {
      return [];
    }
    storeNameQuery = storeNameQuery.toLowerCase();
    storeCityQuery = storeCityQuery.toLowerCase();
    return stores.filter((store: Store) => {
      return store.name.toLowerCase().startsWith(storeNameQuery) && store.city.toLowerCase().startsWith(storeCityQuery);
    });
  }
}
