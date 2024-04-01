import { Component } from '@angular/core';
import { UtentiService } from '../utenti.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    campionati: [],
    campionatiCreati: [],
  };

  statistiche:any = {
    numeroGareDisputate: 0,
    posizioneMediaGara: 0,
    posizioneMediaQualifica: 0,
    numeroVittorie: 0,
    numeroPolePositions: 0,
    posizionamentiTop3: 0,
    posizionamentiTop10: 0,
    numeroRitiri: 0,
    numeroPenalita: 0,
  }

  statisticheSprint:any = {
    numeroSprintDisputate: 0,
    posizioneMediaGara: 0,
    numeroVittorie: 0,
    posizionamentiTop3: 0,
    numeroRitiri: 0,
    numeroPenalita: 0,
  }


  fotoProfilo:string = "";

  constructor(
    private utentiService:UtentiService,
    private route:ActivatedRoute,
    private loaderservice:LoaderService,
    private messageService:MessageService,
    private router:Router
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
        this.statistiche = this.profiloUtente.statistiche;
        this.statisticheSprint = this.profiloUtente.statisticheSprint;
        this.fotoProfilo = data.response.utente.urlFotoProfilo
      })
    })
  }

  goToCampionato(id:number):void{
    this.router.navigate([`/campionati/${id}`]);
  }

  startLoading():void{
    this.loaderservice.startLoading();
  }

  stopLoading():void{
    this.loaderservice.stopLoading();
  }
}
