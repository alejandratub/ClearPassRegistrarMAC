import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CSVRecord } from './CSVModel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClearpassService {



  constructor(private http: HttpClient) { }

  registrarMac(direccionIP, token, csvrecord:CSVRecord):  Observable<any> {
    const url ='http://'+ direccionIP+':443/api/endpoint';
    console.log('url: '+url);
    console.log('token' + token);
    //console.log('MAC: '+ macAddress);
    const headers = { 'Authorization': token, 'Content-Type': 'application/json' }
    //const body = {macAddress, 'status': 'Unknown'}
    const body=JSON.stringify(csvrecord);
    console.log('Body'+body);
    
    return this.http.post(url, body, { headers: headers }) 
    
  
  }
}
