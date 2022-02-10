import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from '@core/components/star-rating/star-rating.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgCircleProgressModule } from 'ng-circle-progress';
// import { ChartPieComponent } from './charts/chartPie.component';
// import { ChartComponent } from './charts/chart.component';
import more from 'highcharts/highcharts-more.src';
import solidGauge from 'highcharts/modules/solid-gauge.src';
import { ChartComponent } from './charts/chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartPieComponent } from './charts/chartPie.component';
import { ChartPieCuisineComponent } from './charts/chartPie-cuisine.component';
import { DonutActiveChartComponent } from './charts/donut-active-chart.component';
import { ChartOrderAmountComponent } from './charts/chartOrderAmount.component';
import { ChartOrderCountComponent } from './charts/chartOrderCount.component';

@NgModule({
  declarations: [DashboardComponent, ChartComponent, ChartPieComponent, ChartPieCuisineComponent,
    DonutActiveChartComponent, ChartOrderAmountComponent, ChartOrderCountComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StarRatingModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ChartModule,
    DateRangePickerModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 50,
      // outerStrokeWidth: 8,
      innerStrokeWidth: 4,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    HighchartsChartModule
  ],
})
export class DashboardModule { }
