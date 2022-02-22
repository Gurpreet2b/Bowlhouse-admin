import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'create', loadChildren: ()=>import('@main/components/cuisines/create-cuisine/create-cuisine.module').then(m=>m.CreateCuisineModule)},
  { path: '', loadChildren: ()=>import('@main/components/approvals/restaurant-approvals/restaurant-approvals.module').then(m=>m.RestaurantsApprovalsModule)},
  { path: ':restaurant', loadChildren: ()=>import('@main/components/approvals/restaurant-approvals/restaurant-approvals.module').then(m=>m.RestaurantsApprovalsModule)},
  // { path: ':menu', loadChildren: ()=>import('@main/components/approvals/restaurant-approvals/restaurant-approvals.module').then(m=>m.RestaurantsApprovalsModule)},
  // { path: ':master', loadChildren: ()=>import('@main/components/approvals/restaurant-approvals/restaurant-approvals.module').then(m=>m.RestaurantsApprovalsModule)},
  // { path: ':coupons', loadChildren: ()=>import('@main/components/approvals/restaurant-approvals/restaurant-approvals.module').then(m=>m.RestaurantsApprovalsModule)},
  // { path: ':offers', loadChildren: ()=>import('@main/components/approvals/restaurant-approvals/restaurant-approvals.module').then(m=>m.RestaurantsApprovalsModule)},
  // { path: ':restaurantOffers', loadChildren: ()=>import('@main/components/approvals/restaurant-approvals/restaurant-approvals.module').then(m=>m.RestaurantsApprovalsModule)},
  { path: 'finance/:refund', loadChildren: ()=>import('@main/components/approvals/menu-approvals/menu-approvals.module').then(m=>m.MenuApprovalsModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalRoutingModule { }
