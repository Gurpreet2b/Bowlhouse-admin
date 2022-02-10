import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponRequestComponent } from './components/coupon-request.component';

const routes: Routes = [
  { path: '', component: CouponRequestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRequestRoutingModule { }
