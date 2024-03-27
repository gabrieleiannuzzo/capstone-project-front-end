import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dati-gara',
  templateUrl: './dati-gara.component.html',
  styleUrl: './dati-gara.component.scss'
})
export class DatiGaraComponent {
  @Input() risultatiEvento!:any[];
  @Input() ritiratiEvento!:any[];
  @Input() penalitaEvento!:any[];
  @Input() pilotiTitolari!:any[];
  @Input() wildCards!:any[];
  @Input() scuderie!:any[];
  @Input() blur!:boolean;
  @Output() emitDati = new EventEmitter<any>();

  setScuderia(i:number):void{
    if (!this.risultatiEvento[i].idPilota) {
      this.risultatiEvento[i].idScuderia = "";
      return;
    }

    if (!this.isPilotaTitolare(this.risultatiEvento[i].idPilota)) {
      this.risultatiEvento[i].idScuderia = "";
      return;
    }

    let idScuderia = "";
    for (let p of this.pilotiTitolari) {
      if (p.id == Number(this.risultatiEvento[i].idPilota)) {
        idScuderia = p.scuderia.id;
        break;
      }
    }
    this.risultatiEvento[i].idScuderia = idScuderia;
    this.emitDatiEvento();
  }

  isPilotaTitolare(stringifiedIdPilota:string):boolean{
    if (!stringifiedIdPilota) return false;
    const idPilota = Number(stringifiedIdPilota);
    return this.pilotiTitolari.some(p => p.id == idPilota);
  }

  toggleBoolean(arr:any[], index:number):void{
    arr[index] = !arr[index];
    this.emitDatiEvento();
  }

  getNome(pilota:any, arr:any[], index:number):string{
    if (arr[index].idPilota == pilota.id) {
      return (pilota.utente ? pilota.utente.username : pilota.nome);
    } else {
      return ((pilota.utente ? pilota.utente.username : pilota.nome) + (pilota.wildCard ? "" : " (" + pilota.scuderia.nome + ")"));
    }
  }

  freeDrivers(pilotiArr:any[], eventoArr:any[], index:number){
    const newArr = pilotiArr.filter(p => {
      for (let i = 0; i < eventoArr.length; i++) {
        if (eventoArr[i] && i != index) {
          if (p.id == eventoArr[i].idPilota) return false;
        }
      }
      return true;
    });

    return newArr;
  }

  emitDatiEvento():void{
    const obj:any = {
      risultatiEvento: this.risultatiEvento,
    }

    if (this.ritiratiEvento && this.penalitaEvento) {
      obj.ritiratiEvento = this.ritiratiEvento;
      obj.penalitaEvento = this.penalitaEvento;
    }

    this.emitDati.emit(obj);
  }
}
