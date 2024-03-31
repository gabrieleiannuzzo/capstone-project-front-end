import { Component } from '@angular/core';
import { CampionatiService } from '../campionati.service';
import { MessageService } from '../../../components/message/message.service';
import { LoaderService } from '../../../components/loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, catchError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-gara',
  templateUrl: './gara.component.html',
  styleUrl: './gara.component.scss'
})
export class GaraComponent {
  user!:any;
  idCampionato!:number;
  idGara!:number;

  campionato:any = {
    creator: {
      id: 0,
    },
    admins: [],
  };
  gara:any = {
    nome: "Gara",
    race: [],
  };
  punteggiGara:any[] = [];
  punteggiSprint:any[] = [];

  constructor(
    private campionatiService:CampionatiService,
    private messageService:MessageService,
    private loaderService:LoaderService,
    private route:ActivatedRoute,
    private authService:AuthService,
  ){}

  userSubscription!:Subscription;

  ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(data => {
      this.user = data?.response.utente;
    })

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
        this.punteggiSprint = this.campionato.punteggi.sprintPoints;
        this.punteggiGara = this.campionato.punteggi.racePoints;
        console.log(this.campionato)
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

  amIAllowed():any{
    if (!this.user) return false;
    if (this.user.id == this.campionato.creator.id) return true;
    if (!this.campionato.admins.map((a:any) => a.id).includes(this.user.id)) return true;
    return false;
  }

  getEditGaraLink():string{
    const link = `/campionati/${this.campionato.id}/edit-gara/${this.gara.id}`;
    return link;
  }
}
