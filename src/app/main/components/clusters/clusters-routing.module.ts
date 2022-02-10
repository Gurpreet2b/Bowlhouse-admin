import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'create', loadChildren: ()=>import('@main/components/clusters/create-cluster/create-cluster.module').then(m=>m.CreateClusterModule)},
  { path: '', loadChildren: ()=>import('@main/components/clusters/view-clusters/view-clusters.module').then(m=>m.ViewClustersModule)},
  { path: ':id', loadChildren: ()=>import('@main/components/clusters/edit-cluster/edit-cluster.module').then(m=>m.EditClusterModule)},
  { path: 'information', loadChildren: ()=>import('@main/components/clusters/detail-cluster/detail-cluster.module').then(m=>m.DetailClusterModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClustersRoutingModule { }
