import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingOrderComponent } from './components/pending-order.component';

const routes: Routes = [  { path: '', component: PendingOrderComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingOrderRoutingModule { }
