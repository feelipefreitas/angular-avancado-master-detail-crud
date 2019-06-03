import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [BreadCrumbComponent],
  imports: [
  CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [
    //SharedModules
    CommonModule,
    ReactiveFormsModule,

    //sharedComponents
    BreadCrumbComponent
  ]
})
export class SharedModule { }
