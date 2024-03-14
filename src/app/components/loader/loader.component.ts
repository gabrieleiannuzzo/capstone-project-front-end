import { Component } from '@angular/core';
import { LoaderService } from './loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  loading!:boolean;

  constructor(private loaderService:LoaderService){}

  loadingSubscription!:Subscription;

  ngOnInit(){
    this.loadingSubscription = this.loaderService.loading$.subscribe(data => this.loading = data);
  }
}
