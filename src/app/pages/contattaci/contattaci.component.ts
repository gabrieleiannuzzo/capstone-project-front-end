import { Component } from '@angular/core';

@Component({
  selector: 'app-contattaci',
  templateUrl: './contattaci.component.html',
  styleUrl: './contattaci.component.scss'
})
export class ContattaciComponent {
  nome:string = "";
  email:string = "";
  testo:string = "";

  send():void{
    console.log(this.nome)
    console.log(this.testo)
  }
}
