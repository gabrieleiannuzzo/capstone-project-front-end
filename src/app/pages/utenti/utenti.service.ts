import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  constructor(
    private http:HttpClient
  ){}

  apiUrl:string = environment.apiUrl;

  getProfiloUtente(username:string):Observable<any>{
    return this.http.get(`${this.apiUrl}utenti/${username}/profilo`);
  }

  getInvito(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}utenti/inviti/${id}`);
  }

  updateUsername(username:string, obj:any):Observable<any>{
    return this.http.put(`${this.apiUrl}auth/${username}/update-username`, obj);
  }

  updateEmail(username:string, obj:any):Observable<any>{
    return this.http.put(`${this.apiUrl}auth/${username}/update-email`, obj);
  }

  updatePassword(username:string, obj:any):Observable<any>{
    return this.http.put(`${this.apiUrl}auth/${username}/update-password`, obj);
  }
}
