import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: ()=>import('@main/components/header-content/view-header-content/view-header-content.module').then(m=>m.ViewHeaderContentModule)},
  { path: ':id', loadChildren: ()=>import('@main/components/header-content/edit-header-content/edit-header-content.module').then(m=>m.EditHeaderContentModule)},
  // { path: 'offer-detail', loadChildren: ()=>import('@main/components/offer/detail-offer/detail-offer.module').then(m=>m.DetailOfferModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderContentRoutingModule { }
