import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutstandingComponent } from './components/outstanding.component';

const routes: Routes = [
  { path: '', component: OutstandingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutstandingRoutingModule { }
