import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangerefundRoutingModule } from './changerefund-routing.module';
import { ChangerefundComponent } from './components/changerefund.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ChangerefundComponent],
  imports: [
    CommonModule,
    ChangerefundRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class ChangerefundModule { }
