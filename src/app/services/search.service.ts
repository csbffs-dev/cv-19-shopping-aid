import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  serverUrl: string;
  private readonly SEARCH_ITEM = '/item/query';
  private readonly REQ_HEADER = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) {
    this.serverUrl = SERVER_URL;
  }

  getItemData(userId: string, itemNameQuery: string) {
    return this.http.post(this.serverUrl + this.SEARCH_ITEM, { 'user_id': userId, 'item_name': itemNameQuery }, this.REQ_HEADER);
  }
}
