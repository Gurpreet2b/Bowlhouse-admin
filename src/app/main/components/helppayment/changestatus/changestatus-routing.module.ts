import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangestatusComponent } from './components/changestatus.component';

const routes: Routes = [
  { path: '', component: ChangestatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangestatusRoutingModule { }
