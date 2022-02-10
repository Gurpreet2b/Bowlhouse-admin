import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinalPaymentRoutingModule } from './final-payment-routing.module';
import { FinalPaymentComponent } from './components/final-payment.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [FinalPaymentComponent],
  imports: [
    CommonModule,
    FinalPaymentRoutingModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule
  ]
})
export class FinalPaymentModule { }
