import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Store } from '../models/store';
import { User } from '../models/user';
import { SERVER_URL } from '../../environments/environment';
import { ItemTokens } from '../models/item-tokens';

@Injectable({
  providedIn: 'root'
})

// Service class for CV-19 Shopping Aid API Calls
export class DataService {
  private serverUrl: string;
  readonly GET_USER = '/user/query';
  readonly NEW_USER = '/user/setup';
  readonly EDIT_USER = '/user/edit';
  readonly ADD_STORE = '/store/add';
  readonly GET_STORES = '/store/query';
  readonly REPORT_ITEMS = '/report/upload';
  readonly GET_ITEM_TOKENS = '/item/tokens/query'

  private readonly REQ_HEADER = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  public itemTokens: ItemTokens[] = [];

  storesData = new Subject<Store[]>();

  constructor(private http: HttpClient) {
    this.serverUrl = SERVER_URL;
  }

  getUser(userId: string) {
    const data = { 'user_id': userId };
    return this.http.post(this.serverUrl + this.GET_USER, data, this.REQ_HEADER);
  }

  signUpNewUser(user: User) {
    const data = { 'first_name': user.firstName, 'last_name': user.lastName, 'zip_code': user.zipCode }
    return this.http.post<any>(this.serverUrl + this.NEW_USER, data, this.REQ_HEADER);
  }

  updateUserInfo(user: User) {
    const data = { 'user_id': user.userId, 'first_name': user.firstName, 'last_name': user.lastName, 'zip_code': user.zipCode }
    return this.http.post<any>(this.serverUrl + this.EDIT_USER, data, this.REQ_HEADER);
  }

  addStore(store: Store, userId: string) {
    const data = { 'user_id': userId, 'name': store.name, 'address': store.address };
    return this.http.post(this.serverUrl + this.ADD_STORE, data, this.REQ_HEADER);
  }

  getStores(userId: string): Observable<Store[]> {
    return this.http.post<Store[]>(this.serverUrl + this.GET_STORES, { 'user_id': userId }, this.REQ_HEADER);
  }

  reportItems(userId: string, storeId: string, instockItems: string[], outstockItems: string[]) {
    const data = {
      "user_id": userId,
      "store_id": storeId,
      "in_stock_items": instockItems,
      "out_stock_items": outstockItems
    }
    return this.http.post(this.serverUrl + this.REPORT_ITEMS, data, this.REQ_HEADER);
  }

  loadItemTokens(userId: string) {
    if (!(Array.isArray(this.itemTokens) && this.itemTokens.length)) {
      const data = { 'userID': userId };
      this.http.post(this.serverUrl + this.GET_ITEM_TOKENS, data, this.REQ_HEADER).subscribe((response: ItemTokens[]) => {
        this.itemTokens = response;
        console.log("Loaded %d items and their tokens.", this.itemTokens.length);
      }, err => {
        console.error(err);
      });
    } else {
      console.log("Items already loaded");
    }
  }
}
