import { Component } from '@angular/core';
import { UtentiService } from '../utenti.service';
import { MessageService } from '../../../components/message/message.service';
import { LoaderService } from '../../../components/loader/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError } from 'rxjs';
import { IManageInvitoRequest } from '../../../models/imanage-invito-request';
import { CampionatiService } from '../../campionati/campionati.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-invito',
  templateUrl: './invito.component.html',
  styleUrl: './invito.component.scss'
})
export class InvitoComponent {
  id!:number;
  invito:any = {
    ruolo: "",
    scuderia: {
      nome: "",
    }
  };
  fromUser:any = {
    username: "",
    urlFotoProfilo: "",
  };
  campionato:any = {
    id: 0,
    nome: "",
  };
  accepted:boolean = false;
  inviti:any[] = [];

  constructor(
    private utentiService:UtentiService,
    private messageService:MessageService,
    private loaderService:LoaderService,
    private route:ActivatedRoute,
    private router:Router,
    private campionatiService:CampionatiService,
    private authService:AuthService,
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get("id"))

      this.startLoading()
      this.utentiService.getInvito(this.id)
      .pipe(catchError(error => {
        this.stopLoading();
        const msg = error.error.message ? error.error.message : "Si è verificato un errore";
        if (error.error.status) {
          if (error.error.status == 409) {
            this.accepted = true;
            return[];
          }
        }
        this.messageService.showErrorMessage(msg);
        return [];
      }))
      .subscribe(data => {
        this.stopLoading();
        this.invito = data.response;
        this.fromUser = this.invito.fromUser;
        this.campionato = this.invito.campionato;
        console.log(data)
      })
    });
  }

  redirectToPage(link:string):void{
    this.router.navigate([link]);
  }

  manageInvito(accept:boolean):void{
    const manageInvito:IManageInvitoRequest = {
      accepted: accept,
    }

    this.startLoading()
    this.campionatiService.manageInvito(this.id, manageInvito)
    .pipe(catchError(error => {
      this.stopLoading()
      const msg = error.error.message ? error.error.message : "Si è verificato un errore";
      this.messageService.showErrorMessage(msg);
      return [];
    }))
    .subscribe(data => {
      this.stopLoading();
      let invitiSubscription:Subscription;
      invitiSubscription = this.authService.inviti$.subscribe(data => {
        this.authService.setInviti(data.filter(i => i.id != this.invito.id));
        invitiSubscription.unsubscribe();
      });
      const link:string = accept ? `/campionati/${this.campionato.id}` : "/home";
      this.messageService.showSuccessMessage("Invito accettato con successo");
      this.router.navigate([link]);
    });
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
