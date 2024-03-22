import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuovoCampionatoComponent } from './nuovo-campionato/nuovo-campionato.component';
import { CampionatoComponent } from './campionato/campionato.component';
import { EditCampionatoComponent } from './edit-campionato/edit-campionato.component';
import { GaraComponent } from './gara/gara.component';

const routes: Routes = [
  {
    path: "nuovo-campionato",
    component: NuovoCampionatoComponent,
    title: "Nuovo campionato | Racehub"
  },
  {
    path: ":id",
    component: CampionatoComponent,
    title: "Campionato | Racehub"
  },
  {
    path: ":id/edit",
    component: EditCampionatoComponent,
    title: "Edit campionato | Racehub"
  },
  {
    path: "gare/:id",
    component: GaraComponent,
    title: "Gara | Racehub"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampionatiRoutingModule { }
