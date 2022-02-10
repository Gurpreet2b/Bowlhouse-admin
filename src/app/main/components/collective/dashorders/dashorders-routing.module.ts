import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashordersComponent } from './components/dashorders.component';

const routes: Routes = [
  { path: '', component: DashordersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashordersRoutingModule { }
