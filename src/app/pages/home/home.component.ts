import { Component } from '@angular/core';

interface CustomWindow extends Window{
  adsbygoogle?:any[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
