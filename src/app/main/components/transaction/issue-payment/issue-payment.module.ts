import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuePaymentRoutingModule } from './issue-payment-routing.module';
import { IssuePaymentComponent } from './components/issue-payment.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [IssuePaymentComponent],
  imports: [
    CommonModule,
    IssuePaymentRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    DateRangePickerModule
  ]
})
export class IssuePaymentModule { }
