import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IManageInvitoRequest } from '../../models/imanage-invito-request';

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
    return this.http.get<any>(`${this.apiUrl}utenti/username/containing/${partialUsername}`);
  }

  creaCampionato(nuovoCampionatoObj:any):Observable<any>{
    return this.http.post<any>(this.campionatiUrl, nuovoCampionatoObj);
  }

  getCampionatoById(id:number):Observable<any>{
    return this.http.get<any>(`${this.campionatiUrl}/${id}`);
  }

  invita(invitoRequest:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}inviti`, invitoRequest);
  }

  manageInvito(id:number, manageInvitoRequest:IManageInvitoRequest):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}inviti/${id}/manage`, manageInvitoRequest);
  }

  aggiungiPilotaCustom(invitoRequest:any):Observable<any>{
    return this.http.post(`${this.campionatiUrl}/aggiungi-pilota`, invitoRequest);
  }

  partecipa(invitoRequest:any):Observable<any>{
    return this.http.post(`${this.campionatiUrl}/partecipa`, invitoRequest);
  }

  changeStatusPilota(changeStatusPilotaRequest:any):Observable<any>{
    return this.http.put(`${this.campionatiUrl}/change-status-pilota`, changeStatusPilotaRequest);
  }
}
