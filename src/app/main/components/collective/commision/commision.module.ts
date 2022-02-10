import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommisionRoutingModule } from './commision-routing.module';
import { CommisionComponent } from './components/commision.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [CommisionComponent],
  imports: [
    CommonModule,
    CommisionRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class CommisionModule { }
