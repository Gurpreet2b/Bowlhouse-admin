import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: ()=>import('@main/components/customers/view-customers/view-customers.module').then(m=>m.ViewCustomersModule)},
  { path: 'profile/:id', loadChildren: ()=>import('@main/components/customers/view-profile/view-profile.module').then(m=>m.ViewProfileModule)},
  { path: 'history/:id', loadChildren: ()=>import('@main/components/customers/order-history/order-history.module').then(m=>m.OrderHistoryModule)},
  { path: 'detail/:id', loadChildren: ()=>import('@main/components/customers/order-detail/order-detail.module').then(m=>m.OrderDetailModule)},
  { path: 'custtransaction/:id', loadChildren: ()=>import('@main/components/customers/cust-transaction/cust-transaction.module').then(m=>m.CustTransactionModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
