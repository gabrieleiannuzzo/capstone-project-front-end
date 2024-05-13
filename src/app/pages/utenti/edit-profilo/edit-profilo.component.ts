import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { LoaderService } from '../../../components/loader/loader.service';
import { MessageService } from '../../../components/message/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UtentiService } from '../utenti.service';

@Component({
  selector: 'app-edit-profilo',
  templateUrl: './edit-profilo.component.html',
  styleUrl: './edit-profilo.component.scss'
})
export class EditProfiloComponent {
  username:string = "";
  utente!:any;
  showPasswords:boolean[] = [false, false];

  obj:any = {
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  }

  constructor(
    private authService:AuthService,
    private loaderService:LoaderService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private utentiService:UtentiService,
    private router:Router,
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.username = String(params.get("username"));

      this.startLoading();
      this.utentiService.getProfiloUtente(this.username).pipe(catchError(error => {
        this.stopLoading();
        const msg = error.error.message ? error.error.message : "Si è verificato un errore";
        this.messageService.showErrorMessage(msg);
        return [];
      }))
      .subscribe(data => {
        this.stopLoading();
        this.utente = data.response;

        this.authService.user$.subscribe(res => {
          if (res?.response.utente.username != this.username) {
            this.messageService.showErrorMessage("Non puoi visualizzare questi dati");
            return;
          }

          this.obj.username = this.utente.utente.username;
          this.obj.email = this.utente.utente.email;
        })
      })
    })
  }

  getPasswordClass(i:number):any{
    return {
      "fa-eye": this.showPasswords[i],
      "fa-eye-slash": !this.showPasswords[i],
    }
  }

  toggleShowPassword(i:number):void{
    this.showPasswords[i] = !this.showPasswords[i];
  }

  updateUsername(){
    const obj:any = {
      newUsername: this.obj.username,
    }

    this.startLoading();
    this.utentiService.updateUsername(this.username, obj)
    .pipe(catchError(error => {
      this.stopLoading();
      const msg = error.error.message ? error.error.message : "Si è verificato un errore";
      this.messageService.showErrorMessage(msg);
      return [];
    }))
    .subscribe(data => {
      this.stopLoading();
      this.username = obj.newUsername;
      this.authService.loginFromResponse(data);
      this.router.navigate([`/utenti/${this.username}/edit`]);
      this.messageService.showSuccessMessage("Username cambiato con successo");
    });
  }

  updateEmail(){
    const obj:any = {
      newEmail: this.obj.email,
    }

    this.startLoading();
    this.utentiService.updateEmail(this.username, obj)
    .pipe(catchError(error => {
      this.stopLoading();
      const msg = error.error.message ? error.error.message : "Si è verificato un errore";
      this.messageService.showErrorMessage(msg);
      return [];
    }))
    .subscribe(data => {
      this.stopLoading();
      this.authService.loginFromResponse(data);
      this.messageService.showSuccessMessage("Email cambiata con successo");
    });
  }

  updatePassword(){
    const obj:any = {
      oldPassword: this.obj.oldPassword,
      newPassword: this.obj.newPassword,
    }

    this.startLoading();
    this.utentiService.updatePassword(this.username, obj)
    .pipe(catchError(error => {
      this.stopLoading();
      const msg = error.error.message ? error.error.message : "Si è verificato un errore";
      this.messageService.showErrorMessage(msg);
      return [];
    }))
    .subscribe(data => {
      this.stopLoading();
      this.authService.loginFromResponse(data);
      this.messageService.showSuccessMessage("Password cambiata con successo");
    });
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
