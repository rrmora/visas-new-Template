import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { PagesComponent } from './pages.component';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TreeTableModule,
    PAGES_ROUTES
  ],
  exports: [
    PagesComponent,
    DashboardComponent
  ],
  providers: []
})
export class PagesModule { }
