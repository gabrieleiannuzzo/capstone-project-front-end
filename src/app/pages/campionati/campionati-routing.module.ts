import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuovoCampionatoComponent } from './nuovo-campionato/nuovo-campionato.component';
import { CampionatoComponent } from './campionato/campionato.component';
import { EditCampionatoComponent } from './edit-campionato/edit-campionato.component';
import { GaraComponent } from './gara/gara.component';
import { EditGaraComponent } from './edit-gara/edit-gara.component';
import { ListaGareComponent } from './lista-gare/lista-gare.component';
import { EditAdminsComponent } from './edit-admins/edit-admins.component';
import { EditPilotiComponent } from './edit-piloti/edit-piloti.component';
import { AuthGuard } from '../auth/auth.guard';
import { CampionatiComponent } from './campionati.component';

const routes: Routes = [
  {
    path: "",
    component: CampionatiComponent,
    title: "Campionati | Racehub"
  },
  {
    path: "nuovo-campionato",
    component: NuovoCampionatoComponent,
    title: "Nuovo campionato | Racehub",
    canActivate: [AuthGuard],
  },
  {
    path: ":id",
    component: CampionatoComponent,
    title: "Campionato | Racehub"
  },
  {
    path: ":id/edit",
    component: EditCampionatoComponent,
    title: "Edit campionato | Racehub",
    canActivate: [AuthGuard],
  },
  {
    path: ":id/lista-gare",
    component: ListaGareComponent,
    title: "Lista gare | Racehub",
    canActivate: [AuthGuard],
  },
  {
    path: ":idCampionato/edit-gara/:id",
    component: EditGaraComponent,
    title: "Edit gara | Racehub",
    canActivate: [AuthGuard],
  },
  {
    path: ":id/edit-admins",
    component: EditAdminsComponent,
    title: "Edit admins | Racehub",
    canActivate: [AuthGuard],
  },
  {
    path: ":id/edit-piloti",
    component: EditPilotiComponent,
    title: "Edit piloti | Racehub",
    canActivate: [AuthGuard],
  },
  {
    path: ":idCampionato/gare/:idGara",
    component: GaraComponent,
    title: "Gara | Racehub"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampionatiRoutingModule { }
