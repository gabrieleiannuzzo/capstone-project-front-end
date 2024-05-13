import { Component } from '@angular/core';
import { LoaderService } from '../../components/loader/loader.service';
import { MessageService } from '../../components/message/message.service';
import { EmailService } from '../../services/email.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-contattaci',
  templateUrl: './contattaci.component.html',
  styleUrl: './contattaci.component.scss'
})
export class ContattaciComponent {
  nome:string = "";
  email:string = "";
  testo:string = "";

  constructor(
    private loaderService:LoaderService,
    private messageService:MessageService,
    private emailService:EmailService,
  ){}

  send():void{
    const obj:any = {
      nome: this.nome,
      email: this.email,
      testo: this.testo,
    }

    this.startLoading();
    this.emailService.segnalaUnProblema(obj)
    .pipe(catchError(error => {
      this.stopLoading();
      const msg = error.error.message ? error.error.message : "Si è verificato un errore";
      this.messageService.showErrorMessage(msg);
      return [];
    }))
    .subscribe(data => {
      this.stopLoading();
      this.messageService.showSuccessMessage("Richiesta inviata");
    })
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
