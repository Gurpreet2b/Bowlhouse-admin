import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailOfferComponent } from './components/detail-offer.component';

const routes: Routes = [
  { path: ':id', component: DetailOfferComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailOfferRoutingModule { }
