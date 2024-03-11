import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoaderService } from '../../../components/loader/loader.service';
import { IRegisterRequest } from '../../../models/iregister-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form!:FormGroup;
  showPassword:boolean = false;
  passwordInputType:string = "password";
  inputErrors:boolean[] = [false, false, false];
  showErrorMessages:boolean[] = [false, false, false];
  errorMessages:string[] = ["", "", ""]

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

  onInputClick(index:number){
    this.inputErrors[index] = false;
    this.errorMessages[index] = "";
  }

  onInputBlur(name:string, index:number){
    if (!this.form.get(name)?.value) this.inputErrors[index] = true;
  }

  register(){
    const registerObj:IRegisterRequest = this.form.value;

    if (!/^.{4,}$/.test(registerObj.username)) {
      this.inputErrors[0] = true;
      this.errorMessages[0] = "Lo username deve contenere almeno 4 caratteri";
      return;
    }

    if (!/^.{1,20}$/.test(registerObj.username)) {
      this.inputErrors[0] = true;
      this.errorMessages[0] = "Lo username può contenere al massimo 20 caratteri";
      return;
    }

    if (!/^\S*$/.test(registerObj.username)) {
      this.inputErrors[0] = true;
      this.errorMessages[0] = "Lo username non può contenere spazi";
      return;
    }

    if (!/^[a-zA-ZÀ-ÿ0-9_.,(){}\[\]&*#$%';"|\+\=\!\?-]*$/.test(registerObj.username)) {
      this.inputErrors[0] = true;
      this.errorMessages[0] = "I simboli accettati sono _.,()[]{}&*#$%';\"|+=!?-";
      return;
    }
  }
}
