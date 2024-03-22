import { CampionatiService } from './../campionati.service';
import { Component } from '@angular/core';
import { LoaderService } from '../../../components/loader/loader.service';
import { MessageService } from '../../../components/message/message.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-campionato',
  templateUrl: './edit-campionato.component.html',
  styleUrl: './edit-campionato.component.scss'
})
export class EditCampionatoComponent {
  id!:number;
  nome!:string;

  constructor(
    private loaderService:LoaderService,
    private messageService:MessageService,
    private campionatiService:CampionatiService,
    private route:ActivatedRoute,
    private router:Router,
  ){}

  ngOnInit(){
    this.startLoading();
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get("id"));
    })

    this.campionatiService.getCampionatoById(this.id).subscribe(data => {
      this.stopLoading();
      this.nome = data.response.nome;
      console.log(data);
    });
  }

  getLink(page:string):string{
    return "/campionati/" + this.id + "/" + page;
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
