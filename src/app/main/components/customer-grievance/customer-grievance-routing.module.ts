import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'create', loadChildren: ()=>import('@main/components/clusters/create-cluster/create-cluster.module').then(m=>m.CreateClusterModule)},
  { path: '', loadChildren: ()=>import('@main/components/customer-grievance/view-chat/view-chat.module').then(m=>m.ViewChatModule)},
  // { path: 'recent/:Pending', loadChildren: ()=>import('@main/components/ticket-system/view-ticket/view-ticket.module').then(m=>m.ViewTicketModule)},
  // { path: 'archive', loadChildren: ()=>import('@main/components/ticket-system/archive-ticket/archive-ticket.module').then(m=>m.ArchiveTicketModule)},
  // { path: ':id', loadChildren: ()=>import('@main/components/clusters/edit-cluster/edit-cluster.module').then(m=>m.EditClusterModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerGrievanceRoutingModule { }
