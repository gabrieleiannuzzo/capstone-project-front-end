import { ILoginRequest } from './../../../models/ilogin-request';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoaderService } from '../../../components/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!:FormGroup;
  showPassword:boolean = false;
  passwordInputType:string = "password";

  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private loaderService:LoaderService
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

  login(){
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

    this.authService.login(loginObj).subscribe(data => console.log(data));
  }
}
