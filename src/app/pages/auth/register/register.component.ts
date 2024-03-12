import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoaderService } from '../../../components/loader/loader.service';
import { IRegisterRequest } from '../../../models/iregister-request';
import { catchError, throwError } from 'rxjs';

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

  toggleShowPassword():void{
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? "text" : "password";
  }

  onInputClick(index:number):void{
    this.inputErrors[index] = false;
    this.errorMessages[index] = "";
  }

  onInputBlur(name:string, index:number):void{
    if (!this.form.get(name)?.value) this.inputErrors[index] = true;
  }

  register():void{
    const registerObj:IRegisterRequest = this.form.value;
    let errors = false;

    if (!registerObj.username) {
      this.inputErrors[0] = true;
      errors = true;
    }

    if (!registerObj.email) {
      this.inputErrors[1] = true;
      errors = true;
    }

    if (!registerObj.password) {
      this.inputErrors[2] = true;
      errors = true;
    }

    if (errors) return;

    if (!/^[a-zA-ZÀ-ÿ0-9_.,(){}\[\]&*#$%';"|\+\=\!\?-]*$/.test(registerObj.username)) {
      this.inputErrors[0] = true;
      this.errorMessages[0] = "I simboli accettati sono _.,()[]{}&*#$%';\"|+=!?-";
      errors = true;
    }

    if (!/^.{4,}$/.test(registerObj.username)) {
      this.inputErrors[0] = true;
      this.errorMessages[0] = "Lo username deve contenere almeno 4 caratteri";
      errors = true;
    }

    if (!/^.{1,20}$/.test(registerObj.username)) {
      this.inputErrors[0] = true;
      this.errorMessages[0] = "Lo username può contenere al massimo 20 caratteri";
      errors = true;
    }

    if (!/^\S*$/.test(registerObj.username)) {
      this.inputErrors[0] = true;
      this.errorMessages[0] = "Lo username non può contenere spazi";
      errors = true;
    }

    if (!/^[\w\.-]+@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)+$/.test(registerObj.email)) {
      this.inputErrors[1] = true;
      this.errorMessages[1] = "Formato email non valido";
      errors = true;
    }

    if (!/^[a-zA-ZÀ-ÿ0-9@._\-&*#$%'\[\]{}()+\/\\,;\"|+=!?]+$/.test(registerObj.password)) {
      this.inputErrors[2] = true;
      this.errorMessages[2] = "I simboli accettati sono @._\-&*#$%'()[]{}+/,;\"+=!?";
      errors = true;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(registerObj.password)) {
      this.inputErrors[2] = true;
      this.errorMessages[2] = "La password deve contenere almeno una lettera minuscola, una maiuscola e un numero";
      errors = true;
    }

    if (!/^.{6,}$/.test(registerObj.password)) {
      this.inputErrors[2] = true;
      this.errorMessages[2] = "La password deve contenere almeno 6 caratteri";
      errors = true;
    }

    if (!/^.{1,20}$/.test(registerObj.password)) {
      this.inputErrors[2] = true;
      this.errorMessages[2] = "La password può contenere al massimo 20 caratteri";
      errors = true;
    }

    if (errors) return;

    this.startLoading();
    this.authService.register(registerObj)
    .pipe(catchError(error => {
      const errorMessage = error.error.message;
      console.log(errorMessage);

      if (error.error.status == 409) {
        switch (errorMessage) {
          case "Username già in uso":
            this.inputErrors[0] = true;
            this.errorMessages[0] = errorMessage;
            break;
          case "Email già in uso":
            this.inputErrors[1] = true;
            this.errorMessages[1] = errorMessage;
            break;
          default:
            this.inputErrors[0] = true;
            this.inputErrors[1] = true;
            this.errorMessages[0] = "Username già in uso";
            this.errorMessages[1] = "Email già in uso";
        }
      }

      this.stopLoading()
      return throwError(error);
    }))
    .subscribe(data => {
      console.log(data);
      this.stopLoading();
    });
  }

  startLoading(){
    this.loaderService.startLoading();
  }

  stopLoading(){
    this.loaderService.stopLoading();
  }
}
