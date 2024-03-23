import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inviti',
  templateUrl: './inviti.component.html',
  styleUrl: './inviti.component.scss'
})
export class InvitiComponent {
  @Input() isLogged!:boolean;
  @Input() inviti!:any[];

  constructor(
    private router:Router
  ){}

  ngOnInit(){}

  redirectToPage(id:number):void{
    this.router.navigate(["/utenti/inviti/" + id]);
  }
}
