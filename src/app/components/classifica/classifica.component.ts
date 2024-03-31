import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.component.html',
  styleUrl: './classifica.component.scss'
})
export class ClassificaComponent {
  @Input() pilotiTitolari!:any[];
  @Input() wildCards!:any[];
  @Input() pilotiRitirati!:any[];
  @Input() scuderie!:any[];
  @Input() tipologia!:string;
  @Input() limit!:number;

  elementi:any[] = [];
  expanded:boolean = false;

  ngOnChanges(){
    this.elementi = this.elementiDaMostrare();
  }

  elementiDaMostrare():any[]{
    if (this.tipologia == "CLASSIFICA_PILOTI") return this.generaPiloti();
    if (this.tipologia == "CLASSIFICA_COSTRUTTORI") return this.scuderie.sort(this.confrontoPersonalizzato);
    return [];
  }

  generaPiloti():any[]{
    const newWildCards = this.wildCards.filter(w => w.punti > 0);
    const newPilotiRitirati =  this.pilotiRitirati.filter(p => p.punti > 0);
    return this.pilotiTitolari.concat(newWildCards).concat(newPilotiRitirati).sort(this.confrontoPersonalizzato);
  }

  confrontoPersonalizzato(a:any, b:any){
    if (a.punti > b.punti) return -1;
    if (a.punti < b.punti) return 1;
    return 0;
  }

  isRowEven(index:number):boolean{
    return index % 2 == 0;
  }

  isPilotaTitolare(p:any):boolean{
    if (this.tipologia == "CLASSIFICA_COSTRUTTORI") return false;
    return !!p.scuderia;
  }

  getScuderiaColor(el:any):string{
    if (this.tipologia == "CLASSIFICA_COSTRUTTORI") return el.codiceColore;
    return el.scuderia ? el.scuderia.codiceColore : "#fff";
  }

  getNome(el:any):string{
    if (this.tipologia == "CLASSIFICA_COSTRUTTORI") return el.nome;
    return el.utente ? el.utente.username : el.nome;
  }

  toggleExpanded():void{
    this.expanded = !this.expanded;
  }
}
