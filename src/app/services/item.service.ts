import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { SERVER_URL } from 'src/environments/environment';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  data: Item[]
  serverURL: string;
  private readonly GET_ITEM_TOKENS = '/item/tokens/query';
  private readonly REQ_HEADER = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) {
    this.data = [] as Item[];
    this.serverURL = SERVER_URL;
  }

  load(userId: string) {
    if (this.data.length === 0) {
      const data = { 'user_id': userId };
      this.http.post(this.serverURL + this.GET_ITEM_TOKENS, data, this.REQ_HEADER).subscribe((response: Item[]) => {
        this.data = response;
        console.log("Loaded %d items", this.data.length);
      }, err => {
        console.error(err);
      })
    }
    return of(this.data)
  }

  filter(query: string): string[] {
    const limit = 10; // return the first 10 filtered items
    let matchedItems = [] as string[];
    if (query.length) {
      const queryWords = query.toLowerCase().split(' ').filter(w => !!w.trim().length);
      this.data.every((item: Item) => {
        for (let i = 0; i < queryWords.length - 1; i++) {
          let w = queryWords[i];
          if (item.tokens.indexOf(w) === -1) {
            return true; 
          }
        }
        let w = queryWords[queryWords.length-1]
        let matched = false;
        item.tokens.some((token: string) => { 
          if (token.startsWith(w)) {
            matched = true;
            return true;
          }
          return false;
        })
        if (matched) {
          if (matchedItems.push(item.name) === limit) {
            return false; // terminate early
          }
        }
        return true;
      });
    }
    return matchedItems
  }
}
