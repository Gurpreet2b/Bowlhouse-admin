import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllordersRoutingModule } from './allorders-routing.module';
import { AllordersComponent } from './components/allorders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [AllordersComponent],
  imports: [
    CommonModule,
    AllordersRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    DateRangePickerModule
  ]
})
export class AllordersModule { }
