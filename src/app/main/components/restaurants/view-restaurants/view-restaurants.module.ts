import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRestaurantsRoutingModule } from './view-restaurants-routing.module';
import { ViewRestaurantsComponent } from './components/view-restaurants.component';
import { StarRatingModule } from '@core/components/star-rating/star-rating.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ViewRestaurantsComponent],
  imports: [
    CommonModule,
    ViewRestaurantsRoutingModule,
    StarRatingModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class ViewRestaurantsModule { }
