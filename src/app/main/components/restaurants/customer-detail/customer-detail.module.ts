import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDetailRoutingModule } from './customer-detail-routing.module';
import { TabModule } from 'angular-tabs-component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerDetailRoutingModule,
    NgxPaginationModule,
    TabModule
  ]
})
export class CustomerDetailModule { }
