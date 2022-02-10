import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTransactionComponent } from './components/view-transaction.component';

const routes: Routes = [
  { path: '', component: ViewTransactionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTransactionRoutingModule { }
