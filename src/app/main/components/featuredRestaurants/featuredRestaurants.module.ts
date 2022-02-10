import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturedRestaurantsRoutingModule } from './featuredRestaurants-routing.module';
import { FeaturedRestaurantsComponent } from './components/featuredRestaurants.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CreatePositionModule } from './create-position/create-position.module';


@NgModule({
  declarations: [FeaturedRestaurantsComponent],
  imports: [
    CommonModule,
    FeaturedRestaurantsRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    CreatePositionModule,
    DateRangePickerModule
  ]
})
export class FeaturedRestaurantsModule { }
