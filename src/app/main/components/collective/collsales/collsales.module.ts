import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollsalesRoutingModule } from './collsales-routing.module';
import { CollsalesComponent } from './components/collsales.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [CollsalesComponent],
  imports: [
    CommonModule,
    CollsalesRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class CollsalesModule { }
