import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelppaymentRoutingModule } from './helppayment-routing.module';
import { HelppaymentComponent } from './components/helppayment.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [HelppaymentComponent],
  imports: [
    CommonModule,
    HelppaymentRoutingModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    DateRangePickerModule 
  ]
})
export class HelppaymentModule { }
