import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampionatiRoutingModule } from './campionati-routing.module';
import { CampionatiComponent } from './campionati.component';
import { NuovoCampionatoComponent } from './nuovo-campionato/nuovo-campionato.component';
import { PWithInfoBoxComponent } from '../../components/p-with-info-box/p-with-info-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormChoiceComponent } from '../../components/form-choice/form-choice.component';
import { CampionatoComponent } from './campionato/campionato.component';
import { GareECampionatiComponentComponent } from '../../components/gare-e-campionati-component/gare-e-campionati-component.component';
import { UtentiComponent } from '../../components/utenti/utenti.component';
import { EditCampionatoComponent } from './edit-campionato/edit-campionato.component';
import { GaraComponent } from './gara/gara.component';
import { EditGaraComponent } from './edit-gara/edit-gara.component';
import { ListaGareComponent } from './lista-gare/lista-gare.component';
import { EditAdminsComponent } from './edit-admins/edit-admins.component';
import { EditPilotiComponent } from './edit-piloti/edit-piloti.component';
import { SearchUtentiComponent } from '../../components/search-utenti/search-utenti.component';
import { DatiGaraComponent } from '../../components/dati-gara/dati-gara.component';


@NgModule({
  declarations: [
    CampionatiComponent,
    NuovoCampionatoComponent,
    PWithInfoBoxComponent,
    FormChoiceComponent,
    CampionatoComponent,
    GareECampionatiComponentComponent,
    UtentiComponent,
    EditCampionatoComponent,
    GaraComponent,
    EditGaraComponent,
    ListaGareComponent,
    EditAdminsComponent,
    EditPilotiComponent,
    SearchUtentiComponent,
    DatiGaraComponent,
  ],
  imports: [
    CommonModule,
    CampionatiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CampionatiModule { }
