import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor( private httpClient : HttpClient) { }

  test(){
    
    return this.httpClient.get('http://localhost:8080/test/');
  }
}
