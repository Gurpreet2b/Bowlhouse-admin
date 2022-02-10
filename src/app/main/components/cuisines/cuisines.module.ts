import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuisinesRoutingModule } from './cuisines-routing.module';
import { CuisinesComponent } from './components/cuisines.component';


@NgModule({
  declarations: [CuisinesComponent],
  imports: [
    CommonModule,
    CuisinesRoutingModule
  ]
})
export class CuisinesModule { }
