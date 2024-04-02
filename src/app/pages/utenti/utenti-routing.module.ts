import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfiloComponent } from './profilo/profilo.component';
import { InvitoComponent } from './invito/invito.component';

const routes: Routes = [
  {
    path: ":username/profilo",
    component: ProfiloComponent,
    title: "Profilo utente | Racehub",
  },
  {
    path: "inviti/:id",
    component: InvitoComponent,
    title: "Invito | Racehub"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtentiRoutingModule { }
