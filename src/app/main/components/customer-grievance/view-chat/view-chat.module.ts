import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewChatRoutingModule } from './view-chat-routing.module';
import { ViewChatComponent } from './components/view-chat.component';
import { CreateChatModule } from '../create-cluster/create-chat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTicketModule } from '../edit-ticket/edit-ticket.module';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [ViewChatComponent],
  imports: [
    CommonModule,
    ViewChatRoutingModule,
    NgbModalModule,
    NgxPaginationModule,
    CreateChatModule,
    EditTicketModule,
    FormsModule,
    ReactiveFormsModule,
    DateRangePickerModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ViewChatModule { }
