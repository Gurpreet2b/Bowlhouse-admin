import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderTransactionComponent } from './components/order-transaction.component';

const routes: Routes = [
  { path: '', component: OrderTransactionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderTransactionRoutingModule { }
