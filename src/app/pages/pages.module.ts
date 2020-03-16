import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { PagesComponent } from './pages.component';
import { ContentLayoutComponent } from '../shared/components/layout/content-layout/content-layout.component';
import { HeaderComponent } from '../shared/components/header/header.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES
  ],
  exports: [
    PagesComponent,
    DashboardComponent
  ],
  providers: []
})
export class PagesModule { }
