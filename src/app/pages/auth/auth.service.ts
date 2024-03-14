import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ILoginResponse } from '../../models/ilogin-response';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { ILoginRequest } from '../../models/ilogin-request';
import { IRegisterRequest } from '../../models/iregister-request';
import { IUserResponse } from '../../models/iuser-response';
import { IPasswordDimenticataResponse } from '../../models/ipassword-dimenticata-response';
import { IPasswordDimenticataRequest } from '../../models/ipassword-dimenticata-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper:JwtHelperService = new JwtHelperService();
  authSubject = new BehaviorSubject<ILoginResponse|null>(null);
  user$ = this.authSubject.asObservable();
  isLogged$ = this.user$.pipe(map(user => !!user));

  constructor(
    private http:HttpClient,
    private router:Router
  ){
    this.restoreUser();
  }

  apiUrl:string = environment.apiUrl;
  loginUrl:string = this.apiUrl + "auth/login";
  registerUrl:string = this.apiUrl + "auth/register";
  passwordDimenticataUrl:string = this.apiUrl + "auth/recupera-password";

  login(loginObj:ILoginRequest):Observable<ILoginResponse>{
    return this.http.post<ILoginResponse>(this.loginUrl, loginObj).pipe(tap(data => {
      this.authSubject.next(data);
      localStorage.setItem("accessData", JSON.stringify(data));
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

  recuperaPassword(passwordDimenticataRequest:IPasswordDimenticataRequest):Observable<IPasswordDimenticataResponse>{
    return this.http.post<IPasswordDimenticataResponse>(this.passwordDimenticataUrl, passwordDimenticataRequest);
  }
}
