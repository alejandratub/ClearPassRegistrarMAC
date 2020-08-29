import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClearpassService {



  constructor(private http: HttpClient) { }

  registrarMac(direccionIP,token, macAddress) {
    const url ='https://'+ direccionIP+':443/api/endpoint';
    console.log('url: '+url);
    console.log('token' + token);
    console.log('MAC: '+ macAddress);
    const headers = { 'Authorization': token, 'Content-Type': 'application/json' }
    const body = {macAddress, 'status': 'Unknown'}
    console.log('POST');
    console.log(url+body+headers);
    return this.http.post(url, body, { headers: headers })
    
  
  }
}
