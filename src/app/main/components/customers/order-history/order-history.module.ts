import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderHistoryRoutingModule } from './order-history-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderHistoryComponent } from './components/order-history.component';


@NgModule({
  declarations: [OrderHistoryComponent],
  imports: [
    CommonModule,
    OrderHistoryRoutingModule,
    NgxPaginationModule
  ]
})
export class OrderHistoryModule { }
