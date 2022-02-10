import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestDetailRoutingModule } from './rest-detail-routing.module';
import { RestDetailComponent } from './components/rest-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStarsModule } from 'ngx-stars';


@NgModule({
  declarations: [RestDetailComponent],
  imports: [
    CommonModule,
    RestDetailRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStarsModule
  ]
})
export class RestDetailModule { }
