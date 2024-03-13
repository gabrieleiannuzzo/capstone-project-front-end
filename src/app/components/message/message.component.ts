import { Component } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  showErrorMessage:boolean = false;
  errorMessage:string = "";

  showSuccessMessage:boolean = false;
  successMessage:string = "";

  closeErrorMessage():void{
    this.showErrorMessage = false;
  }

  closeSuccessMessage():void{
    this.showSuccessMessage = false;
  }
}
