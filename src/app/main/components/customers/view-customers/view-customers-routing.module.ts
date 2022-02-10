import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCustomersComponent } from './components/view-customers.component';

const routes: Routes = [
  { path: '', component: ViewCustomersComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCustomersRoutingModule { }
