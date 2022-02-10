import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailClusterRoutingModule } from './detail-cluster-routing.module';
import { DetailClusterComponent } from './components/detail-cluster.component';


@NgModule({
  declarations: [DetailClusterComponent],
  imports: [
    CommonModule,
    DetailClusterRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    DetailClusterComponent,
  ]
})
export class DetailClusterModule { }
