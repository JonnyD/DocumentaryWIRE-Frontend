import { AuthenticationService } from './services/authentication.service';
import { VideoSourceService } from './services/video-source.service';
import { AdminDocumentaryEditComponent } from './admin/admin-documentaries/admin-documentary-edit/admin-documentary-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminDocumentariesComponent } from './admin/admin-documentaries/admin-documentaries.component';
import { DocumentaryService } from './services/documentary.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminCommentsComponent } from './admin/admin-comments/admin-comments.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminActivityComponent } from './admin/admin-activity/admin-activity.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminDocumentaryDetailComponent } from './admin/admin-documentaries/admin-documentary-detail/admin-documentary-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DocumentaryResolverService } from './services/documentary-resolver.service';
import { AdminVideoSourcesComponent } from './admin/admin-video-sources/admin-video-sources.component';
import { AdminVideoSourceEditComponent } from './admin/admin-video-sources/admin-video-source-edit/admin-video-source-edit.component';
import { AdminVideoSourceDetailComponent } from './admin/admin-video-sources/admin-video-source-detail/admin-video-source-detail.component';
import { AdminDocumentariesAddComponent } from './admin/admin-documentaries/admin-documentaries-add/admin-documentaries-add.component';
import { LoginComponent } from './public/login/login.component';
import { OauthInterceptor } from './helpers/oauth.interceptor';
import { LogoutComponent } from './public/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminHomeComponent,
    AdminDocumentariesComponent,
    AdminCommentsComponent,
    AdminUsersComponent,
    AdminActivityComponent,
    AdminDocumentaryDetailComponent,
    AdminDocumentaryEditComponent,
    AdminVideoSourcesComponent,
    AdminVideoSourceEditComponent,
    AdminVideoSourceDetailComponent,
    AdminDocumentariesAddComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
		FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    AngularEditorModule 
  ],
  providers: [
    DocumentaryService,
    VideoSourceService,
    DocumentaryResolverService,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
