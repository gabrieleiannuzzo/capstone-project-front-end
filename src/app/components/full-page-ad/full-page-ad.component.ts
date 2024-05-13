import { Component } from '@angular/core';

@Component({
  selector: 'app-full-page-ad',
  templateUrl: './full-page-ad.component.html',
  styleUrl: './full-page-ad.component.scss'
})
export class FullPageAdComponent {
  showAd:boolean = false;

  show():void{
    this.showAd = true;
  }

  hide():void{
    this.showAd = false;
  }
}
