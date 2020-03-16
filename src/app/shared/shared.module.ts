import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentLayoutComponent } from './components/layout/content-layout/content-layout.component';
import { FullLayoutComponent } from './components/layout/full-layout/full-layout.component';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';
// import 'hammerjs';
import 'mousetrap';

// services
import { NavService } from "./services/nav.service";
// Directives
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RightSidebarComponent,
    ContentLayoutComponent,
    FullLayoutComponent,
    FeatherIconsComponent,
    ToggleFullscreenDirective,
    BreadcrumbComponent,
    PagenotfoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    // PagesModule,
    GalleryModule.forRoot()
  ],
  exports: [
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RightSidebarComponent,
    ContentLayoutComponent,
    FullLayoutComponent,
    FeatherIconsComponent,
    ToggleFullscreenDirective,
    BreadcrumbComponent
  ],
  providers: [
    NavService,
  ]
})
export class SharedModule { }

