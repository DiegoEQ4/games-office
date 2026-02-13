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
  getParticipantsByGroup(group:number):Observable<any>{
    return this.httpClient.get(`${this.url}/asign-group/group/${group}`);
  }
  updateParicipantState(id: number, status: boolean):Observable<any>{
    return this.httpClient.patch(`${this.url}/asign-group/${id}`,{status});
  }
  loadImpostor(group:number,config:any):Observable<any>{
    return this.httpClient.post(`${this.url}/game-impostor/load/${group}`,config);
  }

}
