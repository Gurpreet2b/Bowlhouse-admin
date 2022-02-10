import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustTransactionComponent } from './components/cust-transaction.component';

const routes: Routes = [
  { path: '', component: CustTransactionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustTransactionRoutingModule { }
