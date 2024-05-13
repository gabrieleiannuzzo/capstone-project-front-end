import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(
    private http:HttpClient,
  ){}

  apiUrl:string = environment.apiUrl;

  iscrivitiAllaNewsletter(obj:any):Observable<any>{
    return this.http.post(`${this.apiUrl}email/iscriviti-alla-newsletter`, obj);
  }

  richiediCollaborazione(obj:any):Observable<any>{
    return this.http.post(`${this.apiUrl}email/richiedi-collaborazione`, obj);
  }

  segnalaUnProblema(obj:any):Observable<any>{
    return this.http.post(`${this.apiUrl}email/segnala-un-problema`, obj);
  }
}
