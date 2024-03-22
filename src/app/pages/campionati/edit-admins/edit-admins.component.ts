import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../components/loader/loader.service';
import { CampionatiService } from '../campionati.service';
import { MessageService } from './../../../components/message/message.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-admins',
  templateUrl: './edit-admins.component.html',
  styleUrl: './edit-admins.component.scss'
})
export class EditAdminsComponent {
  id!:number;
  admins:any[] = [];
  username!:string;
  utenti:any[] = [];
  showUtentiDiv:boolean = false;

  constructor(
    private messageService:MessageService,
    private loaderService:LoaderService,
    private campionatiService:CampionatiService,
    private route:ActivatedRoute,
  ){}

  ngOnInit(){
    this.startLoading();
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get("id"));
    })

    this.campionatiService.getCampionatoById(this.id).subscribe(data => {
      this.stopLoading();
      this.admins = data.response.admins;
    })
  }

  hideUtentiDiv():void{
    this.showUtentiDiv = false;
    this.utenti = [];
  }

  searchUtenti():void{
    this.startLoading();
    this.campionatiService.getUtentiByPartialUsername(this.username).subscribe(data => {
      this.stopLoading();
      this.showUtentiDiv = true;
      this.utenti = data.response.map((u:any) => u.username);
    });
  }

  setUtente(utente:string):void{
    this.username = utente;
    this.showUtentiDiv = false;
    this.utenti = [];
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
