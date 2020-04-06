import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../data/config/config';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public http: HttpClient) { }
  GetClients(from: number = 0) {
    let url = URL_SERVICES + '/cliente?desde=' + from;
    return this.http.get(url);
  }
}
