import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangerefundComponent } from './components/changerefund.component';

const routes: Routes = [
  { path: '', component: ChangerefundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangerefundRoutingModule { }
