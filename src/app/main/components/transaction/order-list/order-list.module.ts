import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListComponent } from './components/order-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from '@core/components/star-rating/star-rating.module';
// import { AngularCreatePdfModule } from 'angular-create-pdf';


@NgModule({
  declarations: [OrderListComponent],
  imports: [
    CommonModule,
    OrderListRoutingModule,
    StarRatingModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    // AngularCreatePdfModule,
  ]
})
export class OrderListModule { }
