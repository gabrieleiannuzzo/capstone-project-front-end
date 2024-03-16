import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampionatiRoutingModule } from './campionati-routing.module';
import { CampionatiComponent } from './campionati.component';
import { NuovoCampionatoComponent } from './nuovo-campionato/nuovo-campionato.component';
import { PWithInfoBoxComponent } from '../../components/p-with-info-box/p-with-info-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormChoiceComponent } from '../../components/form-choice/form-choice.component';


@NgModule({
  declarations: [
    CampionatiComponent,
    NuovoCampionatoComponent,
    PWithInfoBoxComponent,
    FormChoiceComponent
  ],
  imports: [
    CommonModule,
    CampionatiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CampionatiModule { }
