import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampionatiRoutingModule } from './campionati-routing.module';
import { CampionatiComponent } from './campionati.component';


@NgModule({
  declarations: [
    CampionatiComponent
  ],
  imports: [
    CommonModule,
    CampionatiRoutingModule
  ]
})
export class CampionatiModule { }
