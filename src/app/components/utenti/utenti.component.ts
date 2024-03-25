import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrl: './utenti.component.scss'
})
export class UtentiComponent {
  @Input() fotoUrl!:string;
  @Input() id!:number;
  @Input() nome!:string;
  @Input() scuderia!:any;
  @Input() link!:string;
  @Input() realUser!:boolean;
  @Input() edit!:boolean;
  @Input() scuderie!:any[];
  @Input() pilotiTitolari!:any[];
  @Input() wildCards!:any[];
  @Input() pilotiRitirati!:any[];
  @Output() emitValue = new EventEmitter<any>();

  showEditDiv:boolean = false;
  nuovaScuderia:string = "";
  showConfirmDivs:boolean[] = [false, false, false];

  constructor(
    private router:Router,
    private messageService:MessageService,
  ){}

  redirectToPage(){
    if (this.realUser && !this.edit) this.router.navigate([this.link]);
  }

  scuderieLibere():any[]{
    const scuderieLibereArr:any[] = this.scuderie.filter(s => {
      let contatore:number = 0;
      if (this.scuderia) {
        if (this.scuderia.id == s.id) return false;
      }
      for (let p of this.pilotiTitolari) {
        if (p.scuderia.id == s.id) contatore++;
      }
      if (contatore < 2) return true;
      return false;
    });

    return scuderieLibereArr;
  }

  toggleConfirmDiv(index:number):void{
    for (let i = 0; i < this.showConfirmDivs.length; i++) {
      if (i != index) this.showConfirmDivs[i] = false;
    }
    this.showConfirmDivs[index] = !this.showConfirmDivs[index];
  }

  hideConfirmDiv(index:number):void{
    this.showConfirmDivs[index] = false;
  }

  isPilotaTitolare(){
    return this.pilotiTitolari.some(p => {
      if (this.realUser) return p.utente.username == this.nome;
      return p.nome == this.nome;
    })
  }

  isWildCard(){
    return this.wildCards.some(p => {
      if (this.realUser) return p.utente.username == this.nome;
      return p.nome == this.nome;
    })
  }

  isPilotaRiritato(){
    return this.pilotiRitirati.some(p => {
      if (this.realUser) return p.utente.username == this.nome;
      return p.nome == this.nome;
    })
  }

  handlePilota(action:string):void{
    const changeStatusPilotaObj:any = {
      idPilota: this.id,
      action: action,
      idNuovaScuderia: null,
    }

    if (action == "TO_PILOTA_TITOLARE") {
      if (!this.nuovaScuderia) this.messageService.showErrorMessage("Devi inserire la scuderia");
      changeStatusPilotaObj.idNuovaScuderia = Number(this.nuovaScuderia);
    }

    this.emitValue.emit(changeStatusPilotaObj);
  }

  toggleShowEditDiv():void{
    this.showEditDiv = !this.showEditDiv;
    this.showConfirmDivs.fill(false);
  }
}
