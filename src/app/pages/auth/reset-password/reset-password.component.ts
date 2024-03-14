import { IUpdatePasswordRequest } from './../../../models/iupdate-password-request';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoaderService } from '../../../components/loader/loader.service';
import { MessageService } from '../../../components/message/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  username!:string|null;
  code!:string|null;
  form!:FormGroup;
  showPassword:boolean = false;
  errorMessage:string = "";
  emptyInput:boolean = false;

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private loaderService:LoaderService,
    private messageService:MessageService,
    private router:Router,
    private route:ActivatedRoute
  ){}

  ngOnInit(){
    this.username = this.route.snapshot.queryParamMap.get("username");
    this.code = this.route.snapshot.queryParamMap.get("code");

    this.form = this.fb.group({
      oldPassword: this.fb.control(null),
      newPassword: this.fb.control(null),
    });
  }

  onInputFocus():void{
    this.errorMessage = "";
    this.emptyInput = false;
  }

  onInputBlur(name:string){
    if (!this.form.get(name)?.value) this.emptyInput = true;
  }

  passwordInputType():string{
    const type:string = this.showPassword ? "text" : "password";
    return type;
  }

  toggleShowPassword():void{
    this.showPassword = !this.showPassword;
  }

  resetPassword(){
    const updatePasswordRequest:IUpdatePasswordRequest = this.form.value;
    let error = false;
    const obj = {...updatePasswordRequest};
    obj.oldPassword = "";
obj
    if (!obj.newPassword) {
      this.emptyInput = true;
      return;
    }

    if (!/^[a-zA-ZÀ-ÿ0-9@._\-&*#$%'\[\]{}()+\/\\,;\"|+=!?]+$/.test(obj.newPassword)) {
      this.errorMessage = "I simboli accettati sono @._\-&*#$%'()[]{}+/,;\"+=!?";
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(obj.newPassword)) {
      this.errorMessage = "La password deve contenere almeno una lettera minuscola, una maiuscola e un numero";
      return;
    }

    if (!/^.{6,}$/.test(obj.newPassword)) {
      this.errorMessage = "La password deve contenere almeno 6 caratteri";
      return;
    }

    if (!/^.{1,20}$/.test(obj.newPassword)){
      this.errorMessage = "La password può contenere al massimo 20 caratteri";
      return;
    }

    this.startLoading();
    this.authService.resetPassword(this.username, this.code, obj)
    .pipe(catchError(error => {
      this.stopLoading();
      const status = error.error.status;
      const message = error.error.message;

      if (status == 400) {
        this.errorMessage = message;
      } else if (status == 401 || status == 404) {
        this.messageService.showErrorMessage(message);
      } else {
        this.messageService.showErrorMessage();
      }

      return throwError(() => new Error("Reset password error"));
    }))
    .subscribe(data => {
      this.stopLoading();
      this.messageService.showSuccessMessage("Password cambiata con successo");
      this.router.navigate(["/auth/login"]);
    });
  }

  startLoading():void{
    this.loaderService.startLoading();
  }

  stopLoading():void{
    this.loaderService.stopLoading();
  }
}
