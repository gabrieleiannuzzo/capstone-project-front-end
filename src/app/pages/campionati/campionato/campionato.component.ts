import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampionatiService } from '../campionati.service';
import { LoaderService } from '../../../components/loader/loader.service';

@Component({
  selector: 'app-campionato',
  templateUrl: './campionato.component.html',
  styleUrl: './campionato.component.scss'
})
export class CampionatoComponent {
  id!:number;
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
    private campionatiService:CampionatiService,
    private loaderService:LoaderService,
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get("id"));
    })

    this.startLoading();
    this.campionatiService.getCampionatoById(this.id).subscribe(data => {
      this.stopLoading();
      this.campionato = data.response;
      this.creator = this.campionato.creator;
      this.gare = this.campionato.gare;
      console.log(this.campionato);
      console.log(this.gare);
    });
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
