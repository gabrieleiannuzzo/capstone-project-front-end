import { Component } from '@angular/core';
import { LoaderService } from '../../../components/loader/loader.service';
import { CampionatiService } from '../campionati.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-piloti',
  templateUrl: './edit-piloti.component.html',
  styleUrl: './edit-piloti.component.scss'
})
export class EditPilotiComponent {
  id!:number;
  nome!:string;
  pilotiTitolari:any[] = [];
  wildCards:any[] = [];
  pilotiRitirati:any[] = [];
  scuderie:any[] = [];
  realDrivers!:boolean;

  constructor(
    private loaderService:LoaderService,
    private campionatiService:CampionatiService,
    private route:ActivatedRoute,
  ){}

  ngOnInit(){
    this.startLoading();

    this.route.paramMap.subscribe(params => this.id = Number(params.get("id")));

    this.campionatiService.getCampionatoById(this.id).subscribe(data => {
      this.stopLoading();
      this.nome = data.response.nome;
      this.pilotiTitolari = data.response.pilotiTitolari;
      this.wildCards = data.response.wildCards;
      this.pilotiRitirati = data.response.pilotiRitirati;
      this.scuderie = data.response.scuderie;
      this.realDrivers = data.response.options.realDrivers;
    })
  }

  updatePilotiTitolari(data:any):void{
    this.pilotiTitolari = data.response.pilotiTitolari;
  }

  updateWildCards(data:any):void{
    this.wildCards = data.response.wildCards;
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
