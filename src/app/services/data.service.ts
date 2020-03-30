import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// Service class for CV-19 Shopping Aid API Calls
export class DataService {

  constructor(private http: HttpClient) { }
}
