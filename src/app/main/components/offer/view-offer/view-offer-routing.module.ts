import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewOfferComponent } from './components/view-offer.component';

const routes: Routes = [
  { path: '', component: ViewOfferComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewOfferRoutingModule { }
