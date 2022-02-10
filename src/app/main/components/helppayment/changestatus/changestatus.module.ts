import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangestatusRoutingModule } from './changestatus-routing.module';
import { ChangestatusComponent } from './components/changestatus.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ChangestatusComponent],
  imports: [
    CommonModule,
    ChangestatusRoutingModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule
  ]
})
export class ChangestatusModule { }
