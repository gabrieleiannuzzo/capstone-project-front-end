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
  campionato:any = {
    options: {
      fastestLapPoint: false,
    }
  };
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
  giroVeloce:any[] = [];
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
        console.log(this.campionato)

        this.populateArray(this.risultatiGara);
        if (data.response.options.fastestLapPoint) this.populateArray(this.giroVeloce, 1);
        let qualiLength:number = 20;
        if (!this.saveQuali && this.polePoint) {
          qualiLength = 1;
        } else if (!this.saveQuali && !this.polePoint) {
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

  isPilotaTitolare(id:number):boolean{
    return this.pilotiTitolari.some(p => p.id == id);
  }

  setPiloti(evento:any[], wildCards:any[]):number[]{
    return evento.map(p => {
      if (!this.isPilotaTitolare(p.idPilota) && p.idPilota) {
        const wildCard:any = {
          idWildCard: p.idPilota,
          idScuderia: p.idScuderia,
        }
        if (!wildCards.some((w:any) => w.idPilota == wildCard.idWildCard)) {
          wildCards.push(wildCard);
        } else {
          if (wildCards.filter((w:any) => w.idPilota == wildCard.idWildCard)[0].idScuderia != wildCard.idScuderia) {
            this.messageService.showErrorMessage("I piloti non possono cambiare scuderia durante il weekend");
            return;
          }
        }
      }
      return p.idPilota;
    });
  }

  handleArray(evento:any[]):any[]{
    return evento.filter(p => p).map(p => Number(p));
  }

  saveRisultati():void{
    const wildCards:any = [];
    const retired:any[] = [];
    const penalties:any[] = [];

    for (let i = 0; i < 20; i++) {
      if (this.ritiratiGara[i] && this.risultatiGara[i].idPilota) retired.push(Number(this.risultatiGara[i].idPilota));

      if (this.penalitaGara[i] && this.risultatiGara[i].idPilota) penalties.push(Number(this.risultatiGara[i].idPilota));
    }

    const obj:any = {
      idGara: this.idGara,
      sprintQuali: [],
      sprintRace: [],
      sprintRetired: [],
      sprintPenalties: [],
      quali: [],
      race: this.handleArray(this.setPiloti(this.risultatiGara, wildCards)),
      retired: retired,
      penalties: penalties,
      idPilotaFastestLap: null,
    }

    if (this.campionato.options.fastestLapPoint) {
      const fastestLapDriver = this.setPiloti(this.giroVeloce, wildCards);
      obj.idPilotaFastestLap = this.handleArray(fastestLapDriver);
    }

    if (this.campionato.options.saveQuali || this.campionato.options.fastestLapDriver) {
      const quali:number[]|null = this.setPiloti(this.risultatiQualifiche, wildCards);
      obj.quali = this.handleArray(quali);
    }

    const matchingGara = this.gare.filter(g => g.id == this.idGara);
    if (matchingGara[0]) {
      if (matchingGara[0].sprint) {
        const sprintRace:number[]|null = this.setPiloti(this.risultatiGaraSprint, wildCards);
        obj.sprintRace = this.handleArray(sprintRace);

        const sprintRetired:number[] = [];
        const sprintPenalties:number[] = [];

        for (let i = 0; i < 20; i++) {
          if (this.ritiratiSprint[i] && this.risultatiGaraSprint[i].idPilota) sprintRetired.push(Number(this.risultatiGaraSprint[i].idPilota));

          if (this.penalitaSprint[i] && this.risultatiGaraSprint[i].idPilota) sprintPenalties.push(Number(this.risultatiGaraSprint[i].idPilota));
        }

        obj.sprintRetired = sprintRetired;
        obj.sprintPenalties = sprintPenalties;

        if (this.campionato.options.saveQuali && this.campionato.options.independentSprint) {
          const sprintQuali:number[]|null = this.setPiloti(this.risultatiQualificheSprint, wildCards);
          obj.sprintQuali = this.handleArray(sprintQuali);
        }
      }
    }

    obj.idPilotaFastestLap = obj.idPilotaFastestLap ? obj.idPilotaFastestLap[0] : null;
    obj.wildCards = wildCards;

    console.log(obj)

    this.startLoading();
    this.campionatiService.aggiornaGara(obj)
    .pipe(catchError(error => {
      this.stopLoading();
      const message:string = error.error.message ? error.error.message : "Si è verificato un errore";
      this.messageService.showErrorMessage(message);
      return [];
    }))
    .subscribe(data => {
      this.stopLoading();
      this.messageService.showSuccessMessage("Dati della gara inseriti con successo");
      this.router.navigate([`/campionati/${this.idCampionato}`]);
    });
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
