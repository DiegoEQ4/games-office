import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/env.develop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  url = environment.apiUrl;
  
  constructor(
    private httpClient: HttpClient
  ){}

  getGroups():Observable<any>{
    return this.httpClient.get(`${this.url}/groups`);
  }

}
