import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewTicketRoutingModule } from './view-ticket-routing.module';
import { ViewTicketComponent } from './components/view-ticket.component';
import { CreateTicketModule } from '../create-cluster/create-ticket.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTicketModule } from '../edit-ticket/edit-ticket.module';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [ViewTicketComponent],
  imports: [
    CommonModule,
    ViewTicketRoutingModule,
    NgbModalModule,
    NgxPaginationModule,
    CreateTicketModule,
    EditTicketModule,
    FormsModule,
    ReactiveFormsModule,
    DateRangePickerModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ViewTicketModule { }
