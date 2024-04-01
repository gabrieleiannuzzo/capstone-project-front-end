import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtentiRoutingModule } from './utenti-routing.module';
import { UtentiComponent } from './utenti.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { InvitoComponent } from './invito/invito.component';


@NgModule({
  declarations: [
    UtentiComponent,
    ProfiloComponent,
    InvitoComponent,
  ],
  imports: [
    CommonModule,
    UtentiRoutingModule
  ],
})
export class UtentiModule { }
