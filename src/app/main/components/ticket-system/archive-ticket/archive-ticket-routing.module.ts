import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveTicketComponent } from './components/archive-ticket.component';

const routes: Routes = [
  { path: '', component: ArchiveTicketComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchiveTicketRoutingModule { }
