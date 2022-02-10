import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailCouponComponent } from './components/detail-coupon.component';

const routes: Routes = [
  { path: ':id', component: DetailCouponComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailCouponRoutingModule { }
