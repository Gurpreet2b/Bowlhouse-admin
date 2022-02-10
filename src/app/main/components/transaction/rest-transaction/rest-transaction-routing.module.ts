import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestTransactionComponent } from './components/rest-transaction.component';

const routes: Routes = [ 
  { path: '', component: RestTransactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestTransactionRoutingModule { }
