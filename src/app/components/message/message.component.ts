import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  showErrorMessage:boolean = false;
  showSuccessMessage:boolean = false;
  errorMessage:string = "";
  successMessage:string = "";

  constructor(private messageService:MessageService){}

  showErrorMessageSubscription!:Subscription;
  showSuccessMessageSubscription!:Subscription;
  errorMessageSubscription!:Subscription;
  successMessageSubscription!:Subscription;

  ngOnInit(){
    this.showErrorMessageSubscription = this.messageService.showErrorMessage$.subscribe(data => this.showErrorMessage = data);

    this.showSuccessMessageSubscription = this.messageService.showSuccessMessage$.subscribe(data => this.showSuccessMessage = data);

    this.errorMessageSubscription = this.messageService.errorMessage$.subscribe(data => this.errorMessage = data);

    this.successMessageSubscription = this.messageService.successMessage$.subscribe(data => this.successMessage = data);
  }

  hideErrorMessage():void{
    this.messageService.hideErrorMessage();
  }

  hideSuccessMessage():void{
    this.messageService.hideSuccessMessage();
  }
}
