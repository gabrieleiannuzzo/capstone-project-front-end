import { ILoginRequest } from './../../../models/ilogin-request';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoaderService } from '../../../components/loader/loader.service';
import { MessageService } from '../../../components/message/message.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!:FormGroup;
  showPassword:boolean = false;
  passwordInputType:string = "password";
  errorMessages:string[] = ["", ""];

  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private loaderService:LoaderService,
    private messageService:MessageService,
    private router:Router
  ){}

  ngOnInit(){
    this.createForm();
  }

  createForm():void{
    const user:string|null = localStorage.getItem("user");
    const password:string|null = localStorage.getItem("password");
    const restaCollegato:boolean = !!user && !!password;

    this.form = this.fb.group({
      user: this.fb.control(user),
      password: this.fb.control(password),
      restaCollegato: this.fb.control(restaCollegato),
    });
  }

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? "text" : "password";
  }

  onInputFocus(index:number):void{
    this.errorMessages[index] = "";
  }

  login(){
    this.errorMessages[0] = "";
    this.errorMessages[1] = "";

    if (this.form.value.restaCollegato) {
      localStorage.setItem("user", this.form.value.user);
      localStorage.setItem("password", this.form.value.password);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("password");
    }

    const loginObj:ILoginRequest = {
      user: this.form.value.user,
      password: this.form.value.password,
    };

    this.startLoading();
    this.authService.login(loginObj)
    .pipe(catchError(error => {
      this.stopLoading();

      const status = error.error.status;
      const message = error.error.message;

      if (status == 400) {
        this.errorMessages[1] = message;
      } else if (status == 404) {
        this.errorMessages[0] = message;
      } else {
        this.messageService.showErrorMessage();
      }

      return throwError(() => new Error("Login error"));
    }))
    .subscribe(data => {
      this.stopLoading();
      this.router.navigate(["/home"]);
    });
  }

  startLoading(){
    this.loaderService.startLoading();
  }

  stopLoading(){
    this.loaderService.stopLoading();
  }
}
