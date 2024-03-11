import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoaderService } from '../../../components/loader/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form!:FormGroup;
  showPassword:boolean = false;
  passwordInputType:string = "password";

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private loaderService:LoaderService
  ){}

  ngOnInit(){
    this.form = this.fb.group({
      username: this.fb.control(null),
      email: this.fb.control(null),
      password: this.fb.control(null),
    });
  }

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? "text" : "password";
  }

  register(){}
}
