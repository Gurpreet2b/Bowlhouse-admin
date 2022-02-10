import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuApprovalsComponent } from './components/menu-approvals.component';

const routes: Routes = [
  { path: '', component: MenuApprovalsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuApprovalsRoutingModule { }
