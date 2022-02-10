import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefundRoutingModule } from './refund-routing.module';
import { RefundComponent } from './components/refund.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [RefundComponent],
  imports: [
    CommonModule,
    RefundRoutingModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    DateRangePickerModule 
  ]
})
export class RefundModule { }
