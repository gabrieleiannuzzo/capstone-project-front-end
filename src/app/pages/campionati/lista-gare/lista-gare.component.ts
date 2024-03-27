import { CampionatiService } from './../campionati.service';
import { Component } from '@angular/core';
import { MessageService } from '../../../components/message/message.service';
import { LoaderService } from '../../../components/loader/loader.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-gare',
  templateUrl: './lista-gare.component.html',
  styleUrl: './lista-gare.component.scss'
})
export class ListaGareComponent {
  id!:number;
  nome!:string;
  gare!:any[];

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
      this.nome = data.response.nome;
      this.gare = data.response.gare;
    })
  }

  getLink(id:number):string{
    return `/campionati/${this.id}/edit-gara/${id}`;
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
