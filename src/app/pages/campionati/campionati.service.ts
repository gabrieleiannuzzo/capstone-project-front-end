import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CampionatiService {
  constructor(
    private http:HttpClient,
  ){}

  apiUrl:string = environment.apiUrl;
  campionatiUrl:string = this.apiUrl + "campionati"

  getUtentiByPartialUsername(partialUsername:string):Observable<any>{
    return this.http.get<any>(this.apiUrl + "utenti/username/containing/" + partialUsername);
  }

  creaCampionato(nuovoCampionatoObj:any):Observable<any>{
    return this.http.post<any>(this.campionatiUrl, nuovoCampionatoObj);
  }

  getCampionatoById(id:number):Observable<any>{
    return this.http.get(this.campionatiUrl + "/" + id);
  }
}
