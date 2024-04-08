import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  url:string = "";

  constructor(
    private router:Router,
  ){}

  ngOnInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) this.url = event.url;
      window.scrollTo(0, 0);
    })
  }

  show():boolean{
    if (this.url.includes("campionati") && (this.url.includes("gare") || this.url.includes("nuovo-campionato") || this.url.includes("edit"))) {
      if (this.url.includes("edit-piloti")) return true;
      return false;
    }
    if (this.url.includes("utenti/inviti/")) return false;
    if (this.url.includes("auth")) return false;
    return true;
  }
}
