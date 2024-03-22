import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { ILoginResponse } from '../../models/ilogin-response';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { ILoginRequest } from '../../models/ilogin-request';
import { IRegisterRequest } from '../../models/iregister-request';
import { IUserResponse } from '../../models/iuser-response';
import { IPasswordDimenticataRequest } from '../../models/ipassword-dimenticata-request';
import { IVoidResponse } from '../../models/ivoid-response';
import { IUpdatePasswordRequest } from '../../models/iupdate-password-request';
import { MessageService } from '../../components/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper:JwtHelperService = new JwtHelperService();
  authSubject = new BehaviorSubject<ILoginResponse|null>(null);
  invitiSubject = new BehaviorSubject<any[]>([]);
  user$ = this.authSubject.asObservable();
  isLogged$ = this.user$.pipe(map(user => !!user));
  inviti$ = this.invitiSubject.asObservable();

  constructor(
    private http:HttpClient,
    private router:Router,
    private messageService:MessageService,
  ){
    this.restoreUser();
  }

  apiUrl:string = environment.apiUrl;
  loginUrl:string = this.apiUrl + "auth/login";
  registerUrl:string = this.apiUrl + "auth/register";
  passwordDimenticataUrl:string = this.apiUrl + "auth/recupera-password";
  resetPasswordUrl:string = this.apiUrl + "auth/reset-password"

  login(loginObj:ILoginRequest):Observable<ILoginResponse>{
    return this.http.post<ILoginResponse>(this.loginUrl, loginObj).pipe(tap(data => {
      this.authSubject.next(data);
      localStorage.setItem("accessData", JSON.stringify(data));

      this.getInviti(data.response.utente.username)
      .pipe(catchError(error => {
        const status = error.error.status;
        const message = error.error.message;

        this.messageService.showErrorMessage(message);

        return [];
      }))
      .subscribe(data => {
        this.invitiSubject.next(data)
        console.log(data);
      });
      this.autoLogout(data.response.accessToken);
    }));
  }

  register(registerObj:IRegisterRequest):Observable<IUserResponse>{
    return this.http.post<IUserResponse>(this.registerUrl, registerObj);
  }

  logout():void{
    this.authSubject.next(null);
    localStorage.removeItem("accessData");
    this.router.navigate(["/"]);
  }

  autoLogout(jwt:string):void{
    const expDate:Date = this.jwtHelper.getTokenExpirationDate(jwt) as Date;
    const expMilliseconds:number = expDate.getTime() - new Date().getTime();

    setTimeout(() => {
      this.logout();
    }, expMilliseconds);
  }

  restoreUser():void{
    const userJson:string|null = localStorage.getItem("accessData");
    if (!userJson) return;

    const accessData:ILoginResponse = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.response.accessToken)) return;

    this.autoLogout(accessData.response.accessToken);
    this.authSubject.next(accessData);
  }

  recuperaPassword(passwordDimenticataRequest:IPasswordDimenticataRequest):Observable<IVoidResponse>{
    return this.http.post<IVoidResponse>(this.passwordDimenticataUrl, passwordDimenticataRequest);
  }

  resetPassword(username:string|null, code:string|null, resetPasswordRequest:IUpdatePasswordRequest){
    return this.http.post<IVoidResponse>(this.resetPasswordUrl + "/" + username + "/" + code, resetPasswordRequest);
  }

  getInviti(username:string):Observable<any>{
    return this.http.get(`${this.apiUrl}utenti/${username}/inviti-ricevuti`);
  }
}
