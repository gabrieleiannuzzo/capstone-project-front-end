import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuovoCampionatoComponent } from './nuovo-campionato/nuovo-campionato.component';

const routes: Routes = [
  {
    path: "nuovo-campionato",
    component: NuovoCampionatoComponent,
    title: "Nuovo campionato | Racehub"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampionatiRoutingModule { }
