import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTicketComponent } from './components/view-ticket.component';

const routes: Routes = [
  { path: '', component: ViewTicketComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTicketRoutingModule { }
