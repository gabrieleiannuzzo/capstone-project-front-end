import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'campionati', loadChildren: () => import('./pages/campionati/campionati.module').then(m => m.CampionatiModule) }, { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
