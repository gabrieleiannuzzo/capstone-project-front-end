import { Component } from '@angular/core';
import { CampionatiService } from '../campionati.service';
import { MessageService } from '../../../components/message/message.service';
import { LoaderService } from '../../../components/loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-gara',
  templateUrl: './gara.component.html',
  styleUrl: './gara.component.scss'
})
export class GaraComponent {
  idCampionato!:number;
  idGara!:number;

  campionato!:any;
  gara:any = {
    nome: "Gara",
    race: [],
  };

  constructor(
    private campionatiService:CampionatiService,
    private messageService:MessageService,
    private loaderService:LoaderService,
    private route:ActivatedRoute
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.idCampionato = Number(params.get("idCampionato"));
      this.idGara = Number(params.get("idGara"));

      this.startLoading();
      this.campionatiService.getCampionatoById(this.idCampionato)
      .pipe(catchError(error => {
        this.stopLoading();
        const msg:string = error.error.message ? error.error.message : "Si è verificato un errore";
        this.messageService.showErrorMessage(msg);
        return [];
      }))
      .subscribe(data => {
        this.stopLoading();
        this.campionato = data.response;
        if (!this.campionato.gare.filter((g:any) => g.id == this.idGara).length) {
          this.messageService.showErrorMessage("La gara non appartiene al campionato selezionato");
          return;
        }
        this.gara = this.campionato.gare.filter((g:any) => g.id == this.idGara)[0];
        console.log(this.campionato);
        console.log(this.gara);
      });
    })
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }

  isRaced():boolean{
    return this.gara.race.length;
  }
}
