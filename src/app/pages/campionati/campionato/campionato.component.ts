import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampionatiService } from '../campionati.service';
import { LoaderService } from '../../../components/loader/loader.service';
import { Subscription } from 'rxjs';

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
  campionato:any = {
    id: 0,
    nome: "",
    idCreator: 0,
    options: {},
    punteggi: {},
    scuderie: [],
    gare: [],
  }

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private campionatiService:CampionatiService,
    private loaderService:LoaderService,
  ){}

  userSubscription!:Subscription;

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get("id"));
    })

    this.userSubscription = this.authService.user$.subscribe(data => {
      this.myId = data?.response.utente.id;
    });

    this.startLoading();
    this.campionatiService.getCampionatoById(this.id).subscribe(data => {
      this.stopLoading();
      this.campionato = data.response;
      this.creator = this.campionato.creator;
      this.gare = this.campionato.gare;
    });
  }

  isMyChampionship():boolean{
    if (this.myId == 0) return false;
    return this.myId == this.creator.id;
  }

  getEditCampionatoLink(id:number):string{
    return "/campionati/" + id + "/edit";
  }

  getGaraLink(id:number):string{
    return "/campionati/gare/" + id;
  }

  getUtenteLink(username:string):string{
    return "/utenti/" + username;
  }

  startLoading(){
    this.loaderService.startLoading();
  }

  stopLoading(){
    this.loaderService.stopLoading();
  }
}
