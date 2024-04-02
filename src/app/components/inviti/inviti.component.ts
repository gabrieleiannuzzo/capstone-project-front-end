import { CampionatiService } from './../../pages/campionati/campionati.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IManageInvitoRequest } from '../../models/imanage-invito-request';
import { MessageService } from '../message/message.service';
import { catchError } from 'rxjs';
import { AuthService } from '../../pages/auth/auth.service';

@Component({
  selector: 'app-inviti',
  templateUrl: './inviti.component.html',
  styleUrl: './inviti.component.scss'
})
export class InvitiComponent {
  @Input() isLogged!:boolean;
  @Input() inviti!:any[];
  @Output() emitValue = new EventEmitter<boolean>();

  constructor(
    private router:Router,
    private campionatiService:CampionatiService,
    private messageService:MessageService,
    private authService:AuthService,
  ){}

  ngOnInit(){}

  redirectToPage(id:number):void{
    this.router.navigate(["/utenti/inviti/" + id]);
    this.emitValue.emit(false);
  }

  manageInvito(id:number, accept:boolean):void{
    const manageInvito:IManageInvitoRequest = {
      accepted: accept,
    }

    this.campionatiService.manageInvito(id, manageInvito)
    .pipe(catchError(error => {
      console.log(error)
      return [];
    }))
    .subscribe(data => {
      this.authService.setInviti(this.inviti.filter(i => i.id != id));
    });
  }
}
