import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordDimenticataComponent } from './password-dimenticata/password-dimenticata.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: "login",
    component: LoginComponent,
    title: "Login | Racehub"
  },
  {
    path: "register",
    component: RegisterComponent,
    title: "Register | Racehub"
  },
  {
    path: "password-dimenticata",
    component: PasswordDimenticataComponent,
    title: "Password dimenticata | Racehub"
  },
  {
    path: "password-dimenticata/reset-password",
    component: ResetPasswordComponent,
    title: "Reset password | Racehub",
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
