import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessstatusRoutingModule } from './successstatus-routing.module';
import { SuccessstatusComponent } from './components/successstatus.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [SuccessstatusComponent],
  imports: [
    CommonModule,
    SuccessstatusRoutingModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule
  ]
})
export class SuccessstatusModule { }
