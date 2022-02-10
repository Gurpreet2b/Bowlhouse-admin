import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTransactionRoutingModule } from './view-transaction-routing.module';
import { ViewTransactionComponent } from './components/view-transaction.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [ViewTransactionComponent],
  imports: [
    CommonModule,
    ViewTransactionRoutingModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    DateRangePickerModule
  ]
})
export class ViewTransactionModule { }
