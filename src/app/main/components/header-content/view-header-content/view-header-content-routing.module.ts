import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewHeaderContentComponent } from './components/view-header-content.component';

const routes: Routes = [
  { path: '', component: ViewHeaderContentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewHeaderContentRoutingModule { }
