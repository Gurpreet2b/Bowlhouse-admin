import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTermsRoutingModule } from './view-terms-routing.module';
import { ViewTermsComponent } from './components/view-terms.component';


@NgModule({
  declarations: [ViewTermsComponent],
  imports: [
    CommonModule,
    ViewTermsRoutingModule
  ]
})
export class ViewTermsModule { }
