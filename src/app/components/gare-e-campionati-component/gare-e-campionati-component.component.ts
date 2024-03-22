import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gare-e-campionati-component',
  templateUrl: './gare-e-campionati-component.component.html',
  styleUrl: './gare-e-campionati-component.component.scss'
})
export class GareECampionatiComponentComponent {
  @Input() nome!:string;
  @Input() link!:string;
  @Input() sprint!:boolean;

  constructor(private router:Router){}

  redirectToPage():void{
    this.router.navigate([this.link]);
  }
}
