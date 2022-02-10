import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentDetailRoutingModule } from './payment-detail-routing.module';
import { PaymentDetailComponent } from './components/payment-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [PaymentDetailComponent],
  imports: [
    CommonModule,
    PaymentDetailRoutingModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    DateRangePickerModule 
  ]
})
export class PaymentDetailModule { }
