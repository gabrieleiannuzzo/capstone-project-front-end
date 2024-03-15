import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampionatiRoutingModule } from './campionati-routing.module';
import { CampionatiComponent } from './campionati.component';
import { NuovoCampionatoComponent } from './nuovo-campionato/nuovo-campionato.component';
import { PWithInfoBoxComponent } from '../../components/p-with-info-box/p-with-info-box.component';


@NgModule({
  declarations: [
    CampionatiComponent,
    NuovoCampionatoComponent,
    PWithInfoBoxComponent,
  ],
  imports: [
    CommonModule,
    CampionatiRoutingModule,
  ]
})
export class CampionatiModule { }
