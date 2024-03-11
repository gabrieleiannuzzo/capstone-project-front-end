import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!:FormGroup;
  showPassword:boolean = false;
  passwordInputType:string = "password";

  constructor(private fb:FormBuilder){}

  ngOnInit(){
    this.form = this.fb.group({
      user: this.fb.control(null),
      password: this.fb.control(null),
      restaCollegato: this.fb.control(null)
    });
  }

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? "text" : "password";
  }
}
