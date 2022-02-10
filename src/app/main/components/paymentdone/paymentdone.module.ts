import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentdoneRoutingModule } from './paymentdone-routing.module';
import { PaymentdoneComponent } from './components/paymentdone.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PaymentdoneComponent],
  imports: [
    CommonModule,
    PaymentdoneRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class PaymentdoneModule { }
