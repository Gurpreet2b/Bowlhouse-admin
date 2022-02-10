import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('@main/components/restaurants/view-restaurants/view-restaurants.module').then(m => m.ViewRestaurantsModule) },
  { path: 'create', loadChildren: () => import('@main/components/restaurants/create-restaurant/create-restaurant.module').then(m => m.CreateRestaurantModule) },
  { path: 'edit/:id', loadChildren: () => import('@main/components/restaurants/edit-restaurant/edit-restaurant.module').then(m => m.EditRestaurantModule) },
  { path: 'menu/:restaurantId', loadChildren: () => import('@main/components/menus/menus.module').then(m => m.MenusModule) },
  // { path: ':restaurantId', loadChildren: () => import('@main/components/menus/view-menus/view-menus.module').then(m => m.ViewMenusModule) },
  { path: 'history/:id', loadChildren: () => import('@main/components/restaurants/resorder-history/resorder-history.module').then(m => m.ResorderHistoryModule) },
  { path: 'customerdetail/:id', loadChildren: () => import('@main/components/restaurants/customer-detail/customer-detail.module').then(m => m.CustomerDetailModule) },
  { path: 'historytransaction/:id', loadChildren: () => import('@main/components/restaurants/history-transaction/history-transaction.module').then(m => m.HistoryTransactionModule) },
  { path: 'bankdetail/:restaurantId', loadChildren: () => import('@main/components/restaurants/bank-detail/bank-detail.module').then(m => m.BankDetailModule) },
  { path: 'restdetail/:id', loadChildren: () => import('@main/components/restaurants/rest-detail/rest-detail.module').then(m => m.RestDetailModule) },
  { path: 'restdetail/:id/:approval', loadChildren: () => import('@main/components/restaurants/rest-detail/rest-detail.module').then(m => m.RestDetailModule) },
  { path: 'editbank/:id', loadChildren: () => import('@main/components/restaurants/edit-bank/edit-bank.module').then(m => m.EditBankModule) },
  { path: 'boughtServices/:id', loadChildren: ()=>import('@main/components/transaction/outstanding/outstanding.module').then(m=>m.OutStandingModule)},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
