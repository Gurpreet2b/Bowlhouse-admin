import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeliveryComponent } from './components/delivery.component';


@NgModule({
  declarations: [DeliveryComponent],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class DeliveryModule { }
