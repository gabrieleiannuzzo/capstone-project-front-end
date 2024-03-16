import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from '../../../components/message/message.service';
import { LoaderService } from '../../../components/loader/loader.service';

@Component({
  selector: 'app-nuovo-campionato',
  templateUrl: './nuovo-campionato.component.html',
  styleUrl: './nuovo-campionato.component.scss'
})
export class NuovoCampionatoComponent {
  form!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private messageService:MessageService,
    private loaderService:LoaderService
  ){}
}
