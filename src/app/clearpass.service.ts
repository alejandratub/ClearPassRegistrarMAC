import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CSVRecord } from './CSVModel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClearpassService {

  constructor(private http: HttpClient) { }

  async registrarMac(direccionIP: any, token: any, csvrecord: CSVRecord) {
    const url = `https://${direccionIP}:443/api/endpoint`;
    const body = {
      mac_address: csvrecord.mac_address,
      status: csvrecord.status
    }
    const headers = { 'Authorization': token, 'Content-Type': 'application/json' }
    return  await this.http.post(url, body, { headers: headers }).toPromise();
  }
}
