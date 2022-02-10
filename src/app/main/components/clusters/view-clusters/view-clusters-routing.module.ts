import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewClustersComponent } from './components/view-clusters.component';

const routes: Routes = [
  { path: '', component: ViewClustersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewClustersRoutingModule { }
