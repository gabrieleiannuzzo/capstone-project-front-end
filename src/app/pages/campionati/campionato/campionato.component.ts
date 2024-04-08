import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampionatiService } from '../campionati.service';
import { LoaderService } from '../../../components/loader/loader.service';
import { Subscription, catchError } from 'rxjs';
import { MessageService } from '../../../components/message/message.service';

@Component({
  selector: 'app-campionato',
  templateUrl: './campionato.component.html',
  styleUrl: './campionato.component.scss'
})
export class CampionatoComponent {
  id!:number;
  myId:number|undefined = 0;
  creator:any = {
    id: 0,
    username: "",
    urlFotoProfilo: "",
  }
  gare:any[] = [];
  admins:any[] = [];
  campionato:any = {
    id: 0,
    nome: "",
    idCreator: 0,
    options: {},
    punteggi: {},
    scuderie: [],
    gare: [],
    admins: [],
  }
  pilotiTitolari:any[] = [];
  wildCards:any[] = [];
  pilotiRitirati:any[] = [];
  scuderie:any[] = [];

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private campionatiService:CampionatiService,
    private loaderService:LoaderService,
    private messageService:MessageService,
  ){}

  userSubscription!:Subscription;

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get("id"));

      this.userSubscription = this.authService.user$.subscribe(data => this.myId = data?.response.utente.id);

      this.startLoading();
      this.campionatiService.getCampionatoById(this.id)
      .pipe(catchError(error => {
        this.stopLoading();
        const msg = error.error.message ? error.error.message : "Si è verificato un errore";
        this.messageService.showErrorMessage(msg);
        return [];
      }))
      .subscribe(data => {
        this.stopLoading();
        data.response.gare.sort(this.confrontoPersonalizzato);
        this.campionato = data.response;
        this.creator = this.campionato.creator;
        this.gare = this.campionato.gare;
        this.admins = this.campionato.admins;
        this.pilotiTitolari = this.campionato.pilotiTitolari;
        this.wildCards = this.campionato.wildCards;
        this.pilotiRitirati = this.campionato.pilotiRitirati;
        this.scuderie = this.campionato.scuderie;
      });
    })
  }

  confrontoPersonalizzato(a:any, b:any){
    if (a.numeroGara < b.numeroGara) return -1;
    if (a.numeroGara > b.numeroGara) return 1;
    return 0;
  }

  isMyChampionship():boolean{
    if (this.myId == 0) return false;
    return this.myId == this.creator.id || this.campionato.admins.map((a:any) => a.id).includes(this.myId);
  }

  getEditCampionatoLink(id:number):string{
    return "/campionati/" + id + "/edit";
  }

  getGaraLink(id:number):string{
    return `/campionati/${this.id}/gare/${id}`;
  }

  getUtenteLink(username:string):string{
    return `/utenti/${username}/profilo`;
  }

  startLoading(){
    this.loaderService.startLoading();
  }

  stopLoading(){
    this.loaderService.stopLoading();
  }
}
