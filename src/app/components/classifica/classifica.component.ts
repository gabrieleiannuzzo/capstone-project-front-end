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

  piloti:any[] = [];

  ngOnInit(){
    this.piloti = this.generaPiloti();
  }

  generaPiloti():any[]{
    const newWildCards = this.wildCards.filter(w => w.punti > 0);
    const newPilotiRitirati =  this.pilotiRitirati.filter(p => p.punti > 0);
    return this.pilotiTitolari.concat(newWildCards).concat(newPilotiRitirati);
  }
}
