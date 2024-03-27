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

  showConfirmDiv:boolean = false;

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

  onEmitValue(data:any, evento:any[], ritirati:any[] = [], penalita:any[] = []):void{
    if (data.ritiratiEvento) {
      ritirati = data.ritiratiEvento;
      penalita = data.penalitaEvento;
    }
    evento = data.risultatiEvento;
  }

  showDiv():void{
    this.showConfirmDiv = true;
  }

  hideDiv():void{
    this.showConfirmDiv = false;
  }

  saveRisultati():void{}

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
