import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './shared/components/layout/content-layout/content-layout.component';
import { content } from './shared/routes/content-routes';
import { FullLayoutComponent } from './shared/components/layout/full-layout/full-layout.component';
import { full } from './shared/routes/full.routes';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
