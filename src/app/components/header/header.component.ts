import { Component } from '@angular/core';
import { AuthService } from '../../pages/auth/auth.service';
import { Subscription } from 'rxjs';
import { ILoginResponse } from '../../models/ilogin-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLogged:boolean = true;
  user!:ILoginResponse|null;
  inviti:any[] = [];
  active:boolean = false;
  showInviti:boolean = false;

  constructor(
    private authService:AuthService,
    private router:Router,
  ){}

  isLoggedSubscription!:Subscription;
  invitiSubscription!:Subscription;
  userSubscription!:Subscription;

  ngOnInit(){
    this.isLoggedSubscription = this.authService.isLogged$.subscribe(data => this.isLogged = data);

    this.invitiSubscription = this.authService.inviti$.subscribe(data => this.inviti = data);

    this.userSubscription = this.authService.user$.subscribe(data => this.user = data);
  }

  toggleShowInviti():void{
    this.showInviti = !this.showInviti;
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

  goToProfile():void{
    this.router.navigate([`/utenti/${this.user?.response.utente.username}/profilo`]);
  }
}
