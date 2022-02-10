import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCouponRoutingModule } from './edit-coupon-routing.module';
import { EditCouponComponent } from './components/edit-coupon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditCouponComponent],
  imports: [
    CommonModule,
    EditCouponRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditCouponModule { }
