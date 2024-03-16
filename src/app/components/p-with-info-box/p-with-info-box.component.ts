import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-p-with-info-box',
  templateUrl: './p-with-info-box.component.html',
  styleUrl: './p-with-info-box.component.scss'
})
export class PWithInfoBoxComponent {
  @Input() name!:string;
  @Input() description!:string;
  @Input() infoBox!:string;
  showInfoBox:boolean = false;

  isInfoBox():boolean{
    if (this.infoBox == "true") return true;return false;
  }

  toggleShowInfoBox():void{
    this.showInfoBox = !this.showInfoBox;
  }
}
