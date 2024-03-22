import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrl: './utenti.component.scss'
})
export class UtentiComponent {
  @Input() fotoUrl!:string;
  @Input() nome!:string;
  @Input() nomeScuderia!:string;
  @Input() coloreScuderia!:string;
  @Input() link!:string;
  @Input() realUser!:boolean;

  constructor(
    private router:Router
  ){}

  redirectToPage(){
    if (this.realUser) this.router.navigate([this.link]);
  }
}
