import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponRequestRoutingModule } from './coupon-request-routing.module';
import { CouponRequestComponent } from './components/coupon-request.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CouponRequestComponent],
  imports: [
    CommonModule,
    CouponRequestRoutingModule,
    NgbModalModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class CouponRequestModule { }
