import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailCouponRoutingModule } from './detail-coupon-routing.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailCouponComponent } from './components/detail-coupon.component';

@NgModule({
  declarations: [DetailCouponComponent],
  imports: [
    CommonModule,
    DetailCouponRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DetailCouponModule { }
