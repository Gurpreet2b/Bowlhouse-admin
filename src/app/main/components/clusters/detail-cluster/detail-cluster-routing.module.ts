import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailClusterComponent } from './components/detail-cluster.component';

const routes: Routes = [
  { path: ':id', component: DetailClusterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailClusterRoutingModule { }
