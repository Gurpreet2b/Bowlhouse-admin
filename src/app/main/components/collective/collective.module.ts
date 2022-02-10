import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectiveRoutingModule } from './collective-routing.module';
import { CollectiveComponent } from './components/collective.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [CollectiveComponent],
  imports: [
    CommonModule,
    CollectiveRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class CollectiveModule { }
