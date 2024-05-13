import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  show:boolean = false;

  toggleShowRingraziamentiDiv(){
    this.show = !this.show;
  }
}
