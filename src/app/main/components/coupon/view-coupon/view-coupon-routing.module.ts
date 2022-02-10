import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCouponComponent } from './components/view-coupon.component';

const routes: Routes = [
  { path: '', component: ViewCouponComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCouponRoutingModule { }
