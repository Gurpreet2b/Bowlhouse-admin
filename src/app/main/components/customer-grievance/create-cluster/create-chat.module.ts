import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateChatRoutingModule } from './create-chat-routing.module';
import { CreateChatComponent } from './components/create-chat.component';


@NgModule({
  declarations: [CreateChatComponent],
  imports: [
    CommonModule,
    CreateChatRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CreateChatComponent,
  ]
})
export class CreateChatModule { }
