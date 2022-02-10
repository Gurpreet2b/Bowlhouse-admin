import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBankComponent } from './components/edit-bank.component';

const routes: Routes = [
  { path: '', component: EditBankComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditBankRoutingModule { }
