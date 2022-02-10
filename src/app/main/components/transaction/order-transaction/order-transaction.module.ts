import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderTransactionRoutingModule } from './order-transaction-routing.module';
import { OrderTransactionComponent } from './components/order-transaction.component';


@NgModule({
  declarations: [OrderTransactionComponent],
  imports: [
    CommonModule,
    OrderTransactionRoutingModule
  ]
})
export class OrderTransactionModule { }
