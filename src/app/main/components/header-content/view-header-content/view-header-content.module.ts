import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewHeaderContentRoutingModule } from './view-header-content-routing.module';
import { ViewHeaderContentComponent } from './components/view-header-content.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateHeaderContentModule } from '../create-header-content/create-header-content.module';


@NgModule({
  declarations: [ViewHeaderContentComponent],
  imports: [
    CommonModule,
    ViewHeaderContentRoutingModule,
    NgbModalModule,
    NgxPaginationModule,
    CreateHeaderContentModule
  ]
})
export class ViewHeaderContentModule { }
