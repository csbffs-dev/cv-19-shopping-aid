import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Store } from '../models/store';
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
  readonly EDIT_USER = '/user/edit';
  readonly ADD_STORE = '/store/add';
  readonly GET_STORES = '/store/query';
  storesData = new Subject<Store[]>();

  constructor(private http: HttpClient) {
    this.serverUrl = SERVER_URL;
  }

  getUser(userId: string) {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const data = { 'user_id': userId };
    return this.http.post(this.serverUrl + this.GET_USER, data, config);
  }

  signUpNewUser(user: User) {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const data = { 'first_name': user.firstName, 'last_name': user.lastName, 'zip_code': user.zipCode }
    return this.http.post<any>(this.serverUrl + this.NEW_USER, data, config);
  }

  updateUserInfo(user: User) {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const data = { 'user_id': user.userId, 'first_name': user.firstName, 'last_name': user.lastName, 'zip_code': user.zipCode }
    return this.http.post<any>(this.serverUrl + this.EDIT_USER, data, config);
  }

  addStore(store: Store, userId: string) {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const data = { 'user_id': userId, 'name': store.name, 'address': store.address };
    return this.http.post(this.serverUrl + this.ADD_STORE, data, config);
  }

  getStores(userId: string): Observable<Store[]> {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post<Store[]>(this.serverUrl + this.GET_STORES, { 'user_id': userId }, config);
  }
}
