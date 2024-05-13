import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../components/loader/loader.service';
import { MessageService } from '../../components/message/message.service';
import { Subscription, catchError } from 'rxjs';
import { CampionatiService } from './campionati.service';

@Component({
  selector: 'app-campionati',
  templateUrl: './campionati.component.html',
  styleUrl: './campionati.component.scss'
})
export class CampionatiComponent {
  user!:any;
  isLogged:boolean = false;
  partialNome:string = "";
  campionati:any[] = [];

  constructor(
    private authService:AuthService,
    private router:Router,
    private loaderService:LoaderService,
    private messageService:MessageService,
    private campionatiService:CampionatiService,
  ){}

  userSubscription!:Subscription;
  isLoggedSubscription!:Subscription;

  ngOnInit(){
    this.isLoggedSubscription = this.authService.isLogged$.subscribe(data => {
      this.isLogged = data;

      this.userSubscription = this.authService.user$.subscribe(data => {
        this.user = data?.response;
      })
    });
  }

  redirect():void{
    if (this.isLogged) {
      this.router.navigate([`/utenti/${this.user.utente.username}/profilo`], {fragment: "i-miei-campionati"});
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }

  search():void{
    if (!this.partialNome) return;

    this.startLoading();
    this.campionatiService.getByPartialNome(this.partialNome)
    .pipe(catchError(error => {
      this.stopLoading();
      const msg = error.error.message ? error.error.message : "Si è verificato un errore";
      this.messageService.showErrorMessage(msg);
      return [];
    }))
    .subscribe(data => {
      this.stopLoading();
      this.campionati = data.response;
    });
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
