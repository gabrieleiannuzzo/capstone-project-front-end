import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampionatiService } from '../campionati.service';
import { LoaderService } from '../../../components/loader/loader.service';
import { MessageService } from '../../../components/message/message.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-edit-gara',
  templateUrl: './edit-gara.component.html',
  styleUrl: './edit-gara.component.scss'
})
export class EditGaraComponent {
  idCampionato!:number;
  idGara!:number;
  campionato!:any;
  gara:any = {
    nome: "",
  };
  saveQuali!:boolean;
  polePoint!:boolean;
  independentSprint!:boolean;
  gare:any[] = [];

  pilotiTitolari:any[] = [];
  wildCards:any[] = [];
  pilotiRitirati:any[] = [];
  scuderie:any[] = [];

  risultatiGara:any[] = [];
  risultatiQualifiche:any[] = [];
  ritiratiGara:any[] = [];
  penalitaGara:any[] = [];
  risultatiGaraSprint:any[] = [];
  risultatiQualificheSprint:any[] = [];
  ritiratiSprint:any[] = [];
  penalitaSprint:any[] = [];

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private campionatiService:CampionatiService,
    private loaderService:LoaderService,
    private messageService:MessageService,
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.idCampionato = Number(params.get("idCampionato"));
      this.idGara = Number(params.get("id"));

      this.startLoading();
      this.campionatiService.getCampionatoById(this.idCampionato)
      .pipe(catchError(error => {
        this.stopLoading();
        if (error.error.message) {
          this.messageService.showErrorMessage(error.error.message);
        } else {
          this.messageService.showErrorMessage();
        }
        return [];
      }))
      .subscribe(data => {
        this.stopLoading();
        this.campionato = data.response;
        this.gare = data.response.gare;
        this.saveQuali = data.response.options.saveQuali;
        this.polePoint = data.response.options.polePoint;
        this.independentSprint = data.response.options.independentSprint;
        this.pilotiTitolari = data.response.pilotiTitolari;
        this.wildCards = data.response.wildCards;
        this.pilotiRitirati = data.response.pilotiRitirati;
        this.scuderie = data.response.scuderie;
        const matchingGara = this.gare.filter(g => g.id == this.idGara);
        if (matchingGara) {
          this.gara = matchingGara[0];
        } else {
          this.messageService.showErrorMessage("Questa gara non esiste")
        }
        console.log(data.response)

        this.populateArray(this.risultatiGara);
        let qualiLength:number = 20;
        if (!this.saveQuali && this.polePoint) {
          qualiLength = 1;
        } else if (!this.polePoint) {
          qualiLength = 0;
        }
        this.populateArray(this.risultatiQualifiche, qualiLength);
        this.populateBooleanArray(this.ritiratiGara);
        this.populateBooleanArray(this.penalitaGara);
        if (this.gara.sprint) {
          this.populateArray(this.risultatiGaraSprint, 20);
          this.populateBooleanArray(this.ritiratiSprint);
          this.populateBooleanArray(this.penalitaSprint);
          if (this.saveQuali && this.independentSprint) this.populateArray(this.risultatiQualificheSprint, 20);
        }
      });
    })
  }

  populateArray(arr:any[], length:number = 20):void{
    for (let i = 0; i < length; i++) {
      const obj:any = {
        idPilota: "",
        idScuderia: "",
      }
      arr.push(obj);
    }
  }

  populateBooleanArray(arr:any[]):void{
    for (let i = 0; i < 20; i++) arr.push(false);
  }

  toggleBoolean(arr:any[], index:number):void{
    arr[index] = !arr[index];
    console.log(this.ritiratiGara)
    console.log(this.penalitaGara)
  }

  getNome(pilota:any, arr:any[], index:number):string{
    if (arr[index].idPilota == pilota.id) {
      return (pilota.utente ? pilota.utente.username : pilota.nome);
    } else {
      return ((pilota.utente ? pilota.utente.username : pilota.nome) + (pilota.wildCard ? "" : " (" + pilota.scuderia.nome + ")"));
    }
  }

  setScuderia(risultatiGara:any, i:number):void{
    if (!risultatiGara[i].idPilota) {
      risultatiGara[i].idScuderia = "";
      return;
    }

    if (!this.isPilotaTitolare(risultatiGara[i].idPilota)) {
      risultatiGara[i].idScuderia = "";
      return;
    }

    console.log(this.risultatiGara)
    let idScuderia = "";
    for (let p of this.pilotiTitolari) {
      if (p.id == Number(risultatiGara[i].idPilota)) {
        idScuderia = p.scuderia.id;
        break;
      }
    }
    risultatiGara[i].idScuderia = idScuderia;
  }

  isPilotaTitolare(stringifiedIdPilota:string):boolean{
    if (!stringifiedIdPilota) return false;
    const idPilota = Number(stringifiedIdPilota);
    return this.pilotiTitolari.some(p => p.id == idPilota);
  }

  freeDrivers(pilotiArr:any[], eventoArr:any[], index:number){
    const newArr = pilotiArr.filter(p => {
      for (let i = 0; i < eventoArr.length; i++) {
        if (eventoArr[i] && i != index) {
          if (p.id == eventoArr[i].idPilota) return false;
        }
      }
      return true;
    });

    return newArr;
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
