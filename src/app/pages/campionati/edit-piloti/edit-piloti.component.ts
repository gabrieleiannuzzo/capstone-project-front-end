import { Component } from '@angular/core';
import { LoaderService } from '../../../components/loader/loader.service';
import { CampionatiService } from '../campionati.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription, catchError } from 'rxjs';
import { MessageService } from '../../../components/message/message.service';

@Component({
  selector: 'app-edit-piloti',
  templateUrl: './edit-piloti.component.html',
  styleUrl: './edit-piloti.component.scss'
})
export class EditPilotiComponent {
  id!:number;
  nome!:string;
  pilotiTitolari:any[] = [];
  wildCards:any[] = [];
  pilotiRitirati:any[] = [];
  scuderie:any[] = [];
  realDrivers!:boolean;
  user!:any;
  scuderiaPartecipazione:string = "";

  constructor(
    private loaderService:LoaderService,
    private campionatiService:CampionatiService,
    private route:ActivatedRoute,
    private authService:AuthService,
    private messageService:MessageService,
  ){}

  userSubscription!:Subscription;

  ngOnInit(){
    this.startLoading();

    this.route.paramMap.subscribe(params => this.id = Number(params.get("id")));

    this.userSubscription = this.authService.user$.subscribe(data => this.user = data);

    this.campionatiService.getCampionatoById(this.id).subscribe(data => {
      this.stopLoading();
      this.nome = data.response.nome;
      this.pilotiTitolari = data.response.pilotiTitolari;
      this.wildCards = data.response.wildCards;
      this.pilotiRitirati = data.response.pilotiRitirati;
      this.scuderie = data.response.scuderie;
      this.realDrivers = data.response.options.realDrivers;
    })
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

  updatePilotiTitolari(data:any):void{
    this.pilotiTitolari = data.response.pilotiTitolari;
  }

  updateWildCards(data:any):void{
    this.wildCards = data.response.wildCards;
  }

  alreadyInChampionship():boolean{
    let bool = false;

    bool = this.checkAlreadyInChampionship(this.pilotiTitolari);
    if (bool) return bool;
    bool = this.checkAlreadyInChampionship(this.wildCards);
    if (bool) return bool;
    bool = this.checkAlreadyInChampionship(this.pilotiRitirati);
    return bool;
  }

  checkAlreadyInChampionship(arr:any[]){
    for (let el of arr) {
      if (el.utente.id == this.user.response.utente.id) return true;
    }
    return false;
  }

  partecipa(wildCard:boolean):void{
    if (!wildCard && !this.scuderiaPartecipazione) {
      this.messageService.showErrorMessage("Inserisci la scuderia");
      return;
    }

    const invitoRequestObj:any = {
      idCampionato: this.id,
      toUserUsername: this.user.response.utente.username,
      ruoloInvito: wildCard ? "WILD_CARD" : "PILOTA_TITOLARE",
      idScuderia: wildCard ? null : Number(this.scuderiaPartecipazione),
    }

    this.startLoading();
    this.campionatiService.partecipa(invitoRequestObj)
    .pipe(catchError(error => {
      this.stopLoading();
      this.messageService.showErrorMessage(error.error.message);
      return [];
    }))
    .subscribe(data => {
      this.messageService.showSuccessMessage("Partecipazione effettuata con successo");
      this.campionatiService.getCampionatoById(this.id)
      .pipe(catchError(error => {
        this.stopLoading();
        this.messageService.showErrorMessage("Si è verificato un errore durante il recupero dei dati. Ricarica la pagina");
        return [];
      }))
      .subscribe(data => {
        this.stopLoading();
        this.nome = data.response.nome;
        this.pilotiTitolari = data.response.pilotiTitolari;
        this.wildCards = data.response.wildCards;
        this.pilotiRitirati = data.response.pilotiRitirati;
        this.scuderie = data.response.scuderie;
        this.realDrivers = data.response.options.realDrivers;
      });
    });
  }

  changeStatusPiloti(data:any):void{
    this.startLoading();

    this.campionatiService.changeStatusPilota(data)
    .pipe(catchError(error => {
      this.stopLoading();
      this.messageService.showErrorMessage(error.error.message);
      return [];
    }))
    .subscribe(data => {
      this.stopLoading();
      this.nome = data.response.nome;
      this.pilotiTitolari = data.response.pilotiTitolari;
      this.wildCards = data.response.wildCards;
      this.pilotiRitirati = data.response.pilotiRitirati;
      this.scuderie = data.response.scuderie;
      this.realDrivers = data.response.options.realDrivers;
    });
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
