import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: ()=>import('@main/components/offer/view-offer/view-offer.module').then(m=>m.ViewOfferModule)},
  { path: ':id', loadChildren: ()=>import('@main/components/offer/edit-offer/edit-offer.module').then(m=>m.EditOfferModule)},
  { path: 'offer-detail', loadChildren: ()=>import('@main/components/offer/detail-offer/detail-offer.module').then(m=>m.DetailOfferModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
