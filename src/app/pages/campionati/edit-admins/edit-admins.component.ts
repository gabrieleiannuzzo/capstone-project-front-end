import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../components/loader/loader.service';
import { CampionatiService } from '../campionati.service';
import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { MessageService } from '../../../components/message/message.service';

@Component({
  selector: 'app-edit-admins',
  templateUrl: './edit-admins.component.html',
  styleUrl: './edit-admins.component.scss'
})
export class EditAdminsComponent {
  id!:number;
  nome!:string;
  admins:any[] = [];

  constructor(
    private loaderService:LoaderService,
    private campionatiService:CampionatiService,
    private route:ActivatedRoute,
    private messageService:MessageService,
  ){}

  ngOnInit(){
    this.startLoading();
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get("id"));

      this.campionatiService.getCampionatoById(this.id)
      .pipe(catchError(error => {
        this.stopLoading();
        const msg = error.error.message ? error.error.message : "Si è verificato un errore";
        this.messageService.showErrorMessage(msg);
        return [];
      }))
      .subscribe(data => {
        this.stopLoading();
        this.nome = data.response.nome;
        this.admins = data.response.admins;
      })
    })
  }

  getUtenteLink(username:string):string{
    return `/utenti/${username}}`
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
