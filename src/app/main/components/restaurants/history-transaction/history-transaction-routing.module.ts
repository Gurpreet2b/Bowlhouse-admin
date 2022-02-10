import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryTransactionComponent } from './components/history-transaction.component';

const routes: Routes = [
  { path: '', component: HistoryTransactionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryTransactionRoutingModule { }
