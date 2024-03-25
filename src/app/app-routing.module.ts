import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/page-404/page-404.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/home"
  },
  {
    path: "home",
    component: HomeComponent,
    title: "Home | Racehub"
  },
  {
    path: 'campionati',
    loadChildren: () => import('./pages/campionati/campionati.module').then(m => m.CampionatiModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "page-404",
    component: Page404Component,
    title: "Page 404 | Racehub"
  },
  { path: 'utenti', loadChildren: () => import('./pages/utenti/utenti.module').then(m => m.UtentiModule) },
  {
    path: "**",
    redirectTo: "/page-404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
