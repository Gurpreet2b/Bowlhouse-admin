import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCouponRoutingModule } from './create-coupon-routing.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCouponComponent } from './components/create-coupon.component';


@NgModule({
  declarations: [CreateCouponComponent],
  imports: [
    CommonModule,
    CreateCouponRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CreateCouponComponent,
  ]
})
export class CreateCouponModule { }
