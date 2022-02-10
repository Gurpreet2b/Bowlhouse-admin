import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTermsComponent } from './components/view-terms.component';

const routes: Routes = [
  { path: '', component: ViewTermsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTermsRoutingModule { }
