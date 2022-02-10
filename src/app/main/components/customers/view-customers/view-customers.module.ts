import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCustomersRoutingModule } from './view-customers-routing.module';
import { ViewCustomersComponent } from './components/view-customers.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ViewCustomersComponent],
  imports: [
    CommonModule,
    ViewCustomersRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class ViewCustomersModule { }
