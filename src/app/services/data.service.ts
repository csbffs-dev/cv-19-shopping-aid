import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { SERVER_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverUrl: string;
  private readonly GET_USER = '/user/query';
  private readonly NEW_USER = '/user/setup';
  private readonly EDIT_USER = '/user/edit';
  private readonly REPORT_ITEMS = '/report/upload';
  private readonly REQ_HEADER = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) {
    this.serverUrl = SERVER_URL;
  }

  getUser(userId: string) {
    const data = { user_id: userId };
    return this.http.post(this.serverUrl + this.GET_USER, data, this.REQ_HEADER);
  }

  signUpNewUser(user: User) {
    const data = { first_name: user.firstName, last_name: user.lastName, zip_code: user.zipCode };
    return this.http.post<any>(this.serverUrl + this.NEW_USER, data, this.REQ_HEADER);
  }

  updateUserInfo(user: User) {
    const data = { user_id: user.userId, first_name: user.firstName, last_name: user.lastName, zip_code: user.zipCode };
    return this.http.post<any>(this.serverUrl + this.EDIT_USER, data, this.REQ_HEADER);
  }

  reportItems(userId: string, storeId: string, instockItems: string[], outstockItems: string[]) {
    const data = {
      user_id: userId,
      store_id: storeId,
      in_stock_items: instockItems,
      out_stock_items: outstockItems
    };
    return this.http.post(this.serverUrl + this.REPORT_ITEMS, data, this.REQ_HEADER);
  }
}
