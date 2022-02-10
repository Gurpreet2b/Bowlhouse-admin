import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsApprovalsRoutingModule } from './restaurant-approvals-routing.module';
import { RestaurantsApprovalsComponent } from './components/restaurant-approvals.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RestaurantsApprovalsComponent],
  imports: [
    CommonModule,
    RestaurantsApprovalsRoutingModule,
    NgbModalModule,
    NgxPaginationModule,
    DateRangePickerModule,
    FormsModule
  ]
})
export class RestaurantsApprovalsModule { }
