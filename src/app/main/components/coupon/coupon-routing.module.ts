import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuisinesComponent } from './components/cuisines.component';

const routes: Routes = [
  // { path: 'create', loadChildren: ()=>import('@main/components/cuisines/create-cuisine/create-cuisine.module').then(m=>m.CreateCuisineModule)},
  { path: '', loadChildren: ()=>import('@main/components/coupon/view-coupon/view-coupon.module').then(m=>m.ViewCouponModule)},
  { path: 'coupon-request', loadChildren: ()=>import('@main/components/coupon/coupon-request/coupon-request.module').then(m=>m.CouponRequestModule)},
  { path: ':id', loadChildren: ()=>import('@main/components/coupon/edit-coupon/edit-coupon.module').then(m=>m.EditCouponModule)},
  { path: 'coupon-detail', loadChildren: ()=>import('@main/components/coupon/detail-coupon/detail-coupon.module').then(m=>m.DetailCouponModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRoutingModule { }
