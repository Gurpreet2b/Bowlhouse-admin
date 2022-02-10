import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollsalesComponent } from './components/collsales.component';

const routes: Routes = [
  { path: '', component: CollsalesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollsalesRoutingModule { }
