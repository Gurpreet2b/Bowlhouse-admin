import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminrefundRoutingModule } from './adminrefund-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminrefundComponent } from './components/adminrefund.component';


@NgModule({
  declarations: [AdminrefundComponent],
  imports: [
    CommonModule,
    AdminrefundRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    DateRangePickerModule 
  ]
})
export class AdminrefundModule { }
