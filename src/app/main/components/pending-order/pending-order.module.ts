import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingOrderComponent } from './components/pending-order.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { PendingOrderRoutingModule } from './pending-order-routing.module';


@NgModule({
  declarations: [PendingOrderComponent],
  imports: [
    CommonModule,
    PendingOrderRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    DateRangePickerModule
  ]
})
export class PendingOrderModule { }
