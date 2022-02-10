import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approvals-routing.module';
import { CuisinesComponent } from './components/cuisines.component';


@NgModule({
  declarations: [CuisinesComponent],
  imports: [
    CommonModule,
    ApprovalRoutingModule
  ]
})
export class ApprovalsModule { }
