import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtentiRoutingModule } from './utenti-routing.module';
import { UtentiComponent } from './utenti.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { InvitoComponent } from './invito/invito.component';
import { EditProfiloComponent } from './edit-profilo/edit-profilo.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UtentiComponent,
    ProfiloComponent,
    InvitoComponent,
    EditProfiloComponent,
  ],
  imports: [
    CommonModule,
    UtentiRoutingModule,
    FormsModule
  ],
})
export class UtentiModule { }
