import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustTransactionRoutingModule } from './cust-transaction-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabModule } from 'angular-tabs-component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustTransactionComponent } from './components/cust-transaction.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [CustTransactionComponent],
  imports: [
    CommonModule,
    CustTransactionRoutingModule,
    NgxPaginationModule,
    TabModule,
    FormsModule,
    NgbModule,
    BsDatepickerModule.forRoot(), 
    DateRangePickerModule
  ]
})
export class CustTransactionModule { }
