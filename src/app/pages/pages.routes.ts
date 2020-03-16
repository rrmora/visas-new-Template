import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ContentLayoutComponent } from '../shared/components/layout/content-layout/content-layout.component';
import { FullLayoutComponent } from '../shared/components/layout/full-layout/full-layout.component';
import { PagenotfoundComponent } from '../shared/components/pagenotfound/pagenotfound.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard'} }
        ]
    },
    {
        path: '',
        component: ContentLayoutComponent,
        // canActivate: [AdminGuard],
       // children: content
      },   {
        path: '',
        component: FullLayoutComponent,
        // canActivate: [AdminGuard],
        // children: full
      },
      { path: '**', component: PagenotfoundComponent}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);