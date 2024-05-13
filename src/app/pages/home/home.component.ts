import { Component } from '@angular/core';
import { MessageService } from '../../components/message/message.service';
import { LoaderService } from '../../components/loader/loader.service';
import { EmailService } from '../../services/email.service';
import { catchError } from 'rxjs';

interface CustomWindow extends Window{
  adsbygoogle?:any[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  emailNewsletter:string = "";
  nome:string = "";
  email:string = "";

  constructor(
    private messageService:MessageService,
    private loaderService:LoaderService,
    private emailService:EmailService,
  ){}

  iscrivitiAllaNewsletter(){
    const iscrizioniJson = localStorage.getItem("iscrizioni");
    let iscrizioni = iscrizioniJson ? JSON.parse(iscrizioniJson) : 0;
    if (iscrizioni == 3) {
      this.messageService.showErrorMessage("Non puoi iscrivere più di 3 email dallo stesso dispositivo");
      return;
    }

    const obj:any = {
      email: this.emailNewsletter
    }

    this.startLoading();
    this.emailService.iscrivitiAllaNewsletter(obj)
    .pipe(catchError(error => {
      this.stopLoading();
      const msg = error.error.message ? error.error.message : "Si è verificato un errore";
      this.messageService.showErrorMessage(msg);
      return [];
    }))
    .subscribe(data => {
      this.stopLoading();
      localStorage.setItem("iscrizioni", JSON.stringify(++iscrizioni));
      this.messageService.showSuccessMessage("Iscrizione effettuata");
    });
  }

  richiediCollaborazione(){
    const obj = {
      nome: this.nome,
      email: this.email,
    }

    this.startLoading();
    this.emailService.richiediCollaborazione(obj)
    .pipe(catchError(error => {
      this.stopLoading();
      const msg = error.error.message ? error.error.message : "Si è verificato un errore";
      this.messageService.showErrorMessage(msg);
      return [];
    }))
    .subscribe(data => {
      this.stopLoading();
      this.messageService.showSuccessMessage("Richiesta effettuata");
    })
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
