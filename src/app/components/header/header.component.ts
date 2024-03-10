import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLogged:boolean = !false;
  active:boolean = false;
  notifications:boolean = false;

  auth(){}

  toggleActive():void{
    this.active = !this.active;
  }
}
