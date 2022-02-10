import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuApprovalsRoutingModule } from './menu-approvals-routing.module';
import { MenuApprovalsComponent } from './components/menu-approvals.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [MenuApprovalsComponent],
  imports: [
    CommonModule,
    MenuApprovalsRoutingModule,
    NgbModalModule,
    NgxPaginationModule
  ]
})
export class MenuApprovalsModule { }
