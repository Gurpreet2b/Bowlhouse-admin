import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryTransactionRoutingModule } from './history-transaction-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabModule } from 'angular-tabs-component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HistoryTransactionComponent } from './components/history-transaction.component';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [HistoryTransactionComponent],
  imports: [
    CommonModule,
    HistoryTransactionRoutingModule,
    NgxPaginationModule,
    TabModule,
    FormsModule,
    NgbModule,
    BsDatepickerModule.forRoot(), 
    DateRangePickerModule
  ]
})
export class HistoryTransactionModule { }
