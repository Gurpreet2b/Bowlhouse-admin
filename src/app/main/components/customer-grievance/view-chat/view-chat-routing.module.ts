import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewChatComponent } from './components/view-chat.component';

const routes: Routes = [
  { path: '', component: ViewChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewChatRoutingModule { }
