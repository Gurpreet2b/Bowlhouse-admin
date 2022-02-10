import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutstandingRoutingModule } from './outstanding-routing.module';
import { OutstandingComponent } from './components/outstanding.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [OutstandingComponent],
  imports: [
    CommonModule,
    OutstandingRoutingModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    DateRangePickerModule 
  ]
})
export class OutStandingModule { }
