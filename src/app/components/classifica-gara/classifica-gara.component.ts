import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-classifica-gara',
  templateUrl: './classifica-gara.component.html',
  styleUrl: './classifica-gara.component.scss'
})
export class ClassificaGaraComponent {
  @Input() piloti!:any[];
  @Input() idPilotaGiroVeloce!:number;
  @Input() ritirati!:any[];
  @Input() penalita!:any[];
  @Input() tipologia!:string;
  @Input() punteggi!:number[];

  isRowEven(index:number):boolean{
    return index % 2 == 0;
  }

  getNome(p:any):string{
    return p.utente ? p.utente.username : p.nome;
  }

  getScuderiaColor(el:any):string{
    return el.scuderia.codiceColore;
  }

  getPunti(idPilota:number, i:number):number{
    if (this.tipologia == "GARA") {
      let punti = 0;
      if (idPilota == this.idPilotaGiroVeloce) punti++;
      return punti + this.punteggi[i];
    }
    if (this.tipologia == "SPRINT") {return this.punteggi[i]}
    return 0;
  }
}
