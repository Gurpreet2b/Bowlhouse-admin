import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefunddashRoutingModule } from './refunddash-routing.module';
import { RefunddashComponent } from './components/refunddash.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [RefunddashComponent],
  imports: [
    CommonModule,
    RefunddashRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class RefunddashModule { }
