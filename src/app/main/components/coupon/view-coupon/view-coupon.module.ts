import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCouponRoutingModule } from './view-coupon-routing.module';
import { ViewCouponComponent } from './components/view-coupon.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateCouponModule } from '../create-coupon/create-coupon.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ViewCouponComponent],
  imports: [
    CommonModule,
    ViewCouponRoutingModule,
    NgbModalModule,
    NgxPaginationModule,
    CreateCouponModule,
    FormsModule
  ]
})
export class ViewCouponModule { }
