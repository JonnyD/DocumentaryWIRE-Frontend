import { DurationService } from './services/duration.service';
import { YearService } from './services/year.service';
import { HomeComponent } from './public/home/home.component';
import { AdminGuard } from './admin/admin-guard.service';
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
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminCategoryDetailComponent } from './admin/admin-categories/admin-category-detail/admin-category-detail.component';
import { AdminCommentDetailComponent } from './admin/admin-comments/admin-comment-detail/admin-comment-detail.component';
import { AdminCommentEditComponent } from './admin/admin-comments/admin-comment-edit/admin-comment-edit.component';
import { AdminCategoryEditComponent } from './admin/admin-categories/admin-category-edit/admin-category-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AdminUserDetailComponent } from './admin/admin-users/admin-user-detail/admin-user-detail.component';
import { AdminUserEditComponent } from './admin/admin-users/admin-user-edit/admin-user-edit.component';
import { BrowseComponent } from './public/browse/browse.component';
import { CategoriesComponent } from './public/categories/categories.component';
import { CategoryShowComponent } from './public/categories/category-show/category-show.component';
import { YearShowComponent } from './public/years/year-show/year-show.component';
import { DurationShowComponent } from './public/duration/duration-show/duration-show.component';

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
    AdminCategoriesComponent,
    AdminCategoryDetailComponent,
    AdminCommentDetailComponent,
    AdminCommentEditComponent,
    AdminCategoryEditComponent,
    HomeComponent,
    AdminUserDetailComponent,
    AdminUserEditComponent,
    BrowseComponent,
    CategoriesComponent,
    CategoryShowComponent,
    YearShowComponent,
    DurationShowComponent
  ],
  imports: [
    BrowserModule,
		FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    NgbModule,
    CarouselModule
  ],
  providers: [
    DocumentaryService,
    VideoSourceService,
    DocumentaryResolverService,
    AuthenticationService,
    YearService,
    DurationService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
