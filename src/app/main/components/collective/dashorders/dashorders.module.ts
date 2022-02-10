import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashordersRoutingModule } from './dashorders-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashordersComponent } from './components/dashorders.component';


@NgModule({
  declarations: [DashordersComponent],
  imports: [
    CommonModule,
    DashordersRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class DashordersModule { }
