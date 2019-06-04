import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [BreadCrumbComponent, PageHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    //SharedModules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    //sharedComponents
    BreadCrumbComponent,
    PageHeaderComponent
  ]
})
export class SharedModule { }
