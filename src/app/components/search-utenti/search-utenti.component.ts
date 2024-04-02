import { catchError } from 'rxjs';
import { CampionatiService } from '../../pages/campionati/campionati.service';
import { LoaderService } from './../loader/loader.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-search-utenti',
  templateUrl: './search-utenti.component.html',
  styleUrl: './search-utenti.component.scss'
})
export class SearchUtentiComponent {
  @Input() idCampionato!:number;
  @Input() tipologiaInvito!:string;
  @Input() pilotiTitolari!:any[];
  @Input() scuderie!:any[];
  @Input() realDrivers!:boolean;
  @Output() emitValue = new EventEmitter<any>();

  username:string = "";
  scuderia:any = "";
  utenti:any[] = [];
  showUtentiDiv:boolean = false;

  constructor(
    private loaderService:LoaderService,
    private campionatiService:CampionatiService,
    private messageService:MessageService,
  ){}

  isPilotaTitolare():boolean{
    if (this.tipologiaInvito == "PILOTA_TITOLARE") return true;
    return false;
  }

  scuderieLibere():any[]{
    return this.scuderie.filter(s => {
      let contatore:number = 0;
      for (let p of this.pilotiTitolari) {
        if (p.scuderia.id == s.id) contatore++;
      }
      if (contatore < 2) return true;
      return false;
    });
  }

  searchUtente(){
    this.startLoading();
    this.campionatiService.getUtentiByPartialUsername(this.username)
    .pipe(catchError(error => {
      this.stopLoading();
      const msg = error.error.message ? error.error.message : "Si è verificato un errore";
      this.messageService.showErrorMessage(msg);
      return [];
    }))
    .subscribe(data => {
      this.stopLoading();
      this.showUtentiDiv = true;
      this.utenti = data.response.map((u:any) => u.username);
    });
  };

  setUtente(username:string):void{
    this.username = username;
    this.showUtentiDiv = false;
    this.utenti = [];
  }

  hideUtentiDiv():void{
    this.showUtentiDiv = false;
    this.utenti = [];
  }

  handleUtente():void{
    const invitoRequest:any = {
      idCampionato: this.idCampionato,
      toUserUsername: this.username,
      ruoloInvito: this.tipologiaInvito,
      idScuderia: this.isPilotaTitolare() && this.scuderia ? Number(this.scuderia) : null,
    }
    this.startLoading();

    if (this.realDrivers) {
      this.invitaUtente(invitoRequest);
    } else {
      this.aggiungiUtente(invitoRequest);
    }
  }

  invitaUtente(invitoRequest:any):void{
    this.campionatiService.invita(invitoRequest)
    .pipe(catchError(error => {
      this.stopLoading();
      this.messageService.showErrorMessage(error.error.message);
      return [];
    }))
    .subscribe(data => {
      this.stopLoading();
      this.username = "";
      this.scuderia = "";
      this.messageService.showSuccessMessage("Invito inviato con successo");
    })
  }

  aggiungiUtente(invitoRequest:any):void{
    this.campionatiService.aggiungiPilotaCustom(invitoRequest)
    .pipe(catchError(error => {
      this.stopLoading();
      this.messageService.showErrorMessage(error.error.message);
      return [];
    }))
    .subscribe(data => {
      this.stopLoading();
      this.username = "";
      this.scuderia = "";
      this.messageService.showSuccessMessage("Pilota aggiunto con successo");

      this.campionatiService.getCampionatoById(this.idCampionato)
      .pipe(catchError(error => {
        this.messageService.showErrorMessage(error.error.message);
        return [];
      }))
      .subscribe(data => {
        this.emitValue.emit(data);
      });
    }
    )
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
