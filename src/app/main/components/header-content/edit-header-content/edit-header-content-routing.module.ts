import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditHeaderContentsComponent } from './components/edit-header-content.component';

const routes: Routes = [
  { path: '', component: EditHeaderContentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditHeaderContentRoutingModule { }
