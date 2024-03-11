import { Component } from '@angular/core';
import { AuthService } from '../../pages/auth/auth.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILoginResponse } from '../../models/ilogin-response';
import { environment } from '../../../environments/environment.development';
import { IInvitoResponse } from '../../models/iinvito-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLogged!:boolean;
  user!:ILoginResponse|null;
  inviti!:IInvitoResponse[];
  active:boolean = false;

  constructor(
    private authService:AuthService,
    private http:HttpClient,
    private router:Router,
  ){}

  isLoggedSubscription!:Subscription;
  userSubscription!:Subscription;

  ngOnInit(){
    this.isLoggedSubscription = this.authService.isLogged$.subscribe(data => this.isLogged = data);

    this.userSubscription = this.authService.user$.subscribe(data => this.user = data);

    this.getPendingNotifications();
  }

  auth(){
    if (this.isLogged) {
      this.authService.logout();
    } else {
      this.router.navigate(["/auth/login"]);
    }
    this.toggleActive();
  }

  toggleActive():void{
    this.active = !this.active;
  }

  getPendingNotifications():void{
    if (!this.isLogged) return;
    const username:string|undefined = this.user?.user.username;
    const invitiUrl = environment.apiUrl + username + "/inviti";
    this.http.get<IInvitoResponse[]>(invitiUrl).subscribe(data => this.inviti = data);
  }

  pendingNotifications():boolean{
    return this.inviti.length > 0;
  }
}
