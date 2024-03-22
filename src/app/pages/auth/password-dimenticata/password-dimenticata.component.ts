import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from '../../../components/loader/loader.service';
import { MessageService } from '../../../components/message/message.service';
import { IPasswordDimenticataRequest } from '../../../models/ipassword-dimenticata-request';
import { AuthService } from '../auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-password-dimenticata',
  templateUrl: './password-dimenticata.component.html',
  styleUrl: './password-dimenticata.component.scss'
})
export class PasswordDimenticataComponent {
  form!:FormGroup;
  errorMessage:string = "";

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private loaderService:LoaderService,
    private messageService:MessageService
  ){}

  ngOnInit(){
    this.form = this.fb.group({
      user: this.fb.control(null),
    });
  }

  onInputFocus():void{
    this.errorMessage = "";
  }

  recuperaPassword(){
    const passwordDimenticataRequest:IPasswordDimenticataRequest = this.form.value;

    this.startLoading();
    this.authService.recuperaPassword(passwordDimenticataRequest)
    .pipe(catchError(error => {
      this.stopLoading();
      const status = error.error.status;
      const message = error.error.message;

      if (status == 404) {
        this.errorMessage = message;
      } else {
        this.messageService.showErrorMessage(message);
      }

      return throwError(() => new Error("Recupera password error"));
    }))
    .subscribe(data => {
      this.stopLoading();
      this.messageService.showSuccessMessage("Email di recupero inviata con successo");
      console.log(data);
    })
  }

  startLoading(){
    this.loaderService.startLoading();
  }

  stopLoading(){
    this.loaderService.stopLoading();
  }
}
