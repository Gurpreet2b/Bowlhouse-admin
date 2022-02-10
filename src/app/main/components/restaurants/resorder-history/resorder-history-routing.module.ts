import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResorderHistoryComponent } from './components/resorder-history.component';

const routes: Routes = [
  { path: '', component: ResorderHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResorderHistoryRoutingModule { }
