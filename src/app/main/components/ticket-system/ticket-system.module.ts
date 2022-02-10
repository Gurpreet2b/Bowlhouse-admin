import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { CuisinesComponent } from './components/cuisines.component';
import { TicketSystemRoutingModule } from './ticket-system-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TicketSystemRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DateRangePickerModule
  ]
})
export class TicketSystemModule { }
