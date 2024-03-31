import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtentiComponent } from './utenti.component';
import { ProfiloComponent } from './profilo/profilo.component';

const routes: Routes = [
  {
    path: ":username/profilo",
    component: ProfiloComponent,
    title: "Profilo utente | Racehub",
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtentiRoutingModule { }
