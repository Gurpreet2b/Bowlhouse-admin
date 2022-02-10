import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  ReactiveFormsModule } from '@angular/forms';
import { CreateTicketRoutingModule } from './create-ticket-routing.module';
import { CreateTicketComponent } from './components/create-ticket.component';


@NgModule({
  declarations: [CreateTicketComponent],
  imports: [
    CommonModule,
    CreateTicketRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateTicketComponent,
  ]
})
export class CreateTicketModule { }
