import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResorderHistoryRoutingModule } from './resorder-history-routing.module';
import { ResorderHistoryComponent } from './components/resorder-history.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TabModule } from 'angular-tabs-component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
@NgModule({
  declarations: [ResorderHistoryComponent],
  imports: [
    CommonModule,
    ResorderHistoryRoutingModule,
    NgxPaginationModule,
    TabModule,
    FormsModule,
    NgbModule,
    BsDatepickerModule.forRoot(), 
    DateRangePickerModule 
  ]
})
export class ResorderHistoryModule { }
