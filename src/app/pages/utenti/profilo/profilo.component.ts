import { Component } from '@angular/core';
import { UtentiService } from '../utenti.service';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { LoaderService } from '../../../components/loader/loader.service';
import { MessageService } from '../../../components/message/message.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent {
  username:string = "";
  profiloUtente:any = {
    statistiche: [],
    statisticheSprint: [],
  };

  fotoProfilo:string = "";

  constructor(
    private utentiService:UtentiService,
    private route:ActivatedRoute,
    private loaderservice:LoaderService,
    private messageService:MessageService
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.username = String(params.get("username"));

      this.startLoading();
      this.profiloUtente = this.utentiService.getProfiloUtente(this.username)
      .pipe(catchError(error => {
        this.stopLoading();
        const msg = error.error.message ? error.error.message : "Si è verificato un errore";
        this.messageService.showErrorMessage(msg);
        return [];
      }))
      .subscribe(data => {
        this.stopLoading();
        console.log(data.response);
        this.profiloUtente = data.response;
        this.fotoProfilo = data.response.utente.urlFotoProfilo
      })
    })
  }

  startLoading():void{
    this.loaderservice.startLoading();
  }

  stopLoading():void{
    this.loaderservice.stopLoading();
  }
}
