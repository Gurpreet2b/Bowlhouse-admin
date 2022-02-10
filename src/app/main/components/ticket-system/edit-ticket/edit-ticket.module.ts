import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTicketRoutingModule } from './edit-ticket-routing.module';
import { EditTicketComponent } from './components/edit-ticket.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [EditTicketComponent],
  imports: [
    CommonModule,
    EditTicketRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports: [
    EditTicketComponent,
  ]
})
export class EditTicketModule { }
