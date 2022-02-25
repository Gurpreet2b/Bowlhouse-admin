import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './components/customers.component';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    HighchartsChartModule
  ]
})
export class CustomersModule { }
