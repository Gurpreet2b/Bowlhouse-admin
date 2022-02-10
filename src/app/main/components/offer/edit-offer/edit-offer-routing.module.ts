import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditOffersComponent } from './components/edit-offer.component';

const routes: Routes = [
  { path: '', component: EditOffersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditOfferRoutingModule { }
