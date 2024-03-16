import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from '../../../components/message/message.service';
import { LoaderService } from '../../../components/loader/loader.service';
import { CampionatiService } from '../campionati.service';

@Component({
  selector: 'app-nuovo-campionato',
  templateUrl: './nuovo-campionato.component.html',
  styleUrl: './nuovo-campionato.component.scss'
})
export class NuovoCampionatoComponent {
  form!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private campionatiService:CampionatiService,
    private messageService:MessageService,
    private loaderService:LoaderService
  ){}

  ngOnInit(){
    this.form = this.fb.group({
      nome: this.fb.control(null),
      tipologiaCalendario: this.fb.control(null),
      numeroGare: this.fb.control(null),
    });
  }

  onEmitValue(value:boolean){
    console.log(value);
  }
}
