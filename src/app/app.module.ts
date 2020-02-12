import { DocumentaryShowStandaloneComponent } from './public/documentary/documentary-add/documentary-add-standalone/documentary-show-standalone/documentary-show-standalone.component';
import { AdminSeriesEditComponent } from './admin/admin-documentaries/admin-documentary-edit/admin-series-edit.component';
import { StatusService } from './services/status.service';
import { AdminStandaloneEditComponent } from './admin/admin-documentaries/admin-documentary-edit/admin-standalone-edit.component';
import { RecaptchaModule, RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaFormsModule } from 'ng-recaptcha';
import { UserGuard } from './public/user-guard.service';
import { ChangeNameComponent } from './public/user/user-edit/change-name/change-name.component';
import { YoutubeService } from './services/youtube.service';
import { SubscriptionService } from './services/subscription.service';
import { WatchlistService } from './services/watchlist.service';
import { UserService } from './services/user.service';
import { DurationService } from './services/duration.service';
import { YearService } from './services/year.service';
import { HomeComponent } from './public/home/home.component';
import { AdminGuard } from './admin/admin-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { VideoSourceService } from './services/video-source.service';
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
import { AdminUserDetailComponent } from './admin/admin-users/admin-user-detail/admin-user-detail.component';
import { AdminUserEditComponent } from './admin/admin-users/admin-user-edit/admin-user-edit.component';
import { BrowseComponent } from './public/browse/browse.component';
import { CategoriesComponent } from './public/categories/categories.component';
import { CategoryShowComponent } from './public/categories/category-show/category-show.component';
import { YearShowComponent } from './public/years/year-show/year-show.component';
import { DurationShowComponent } from './public/duration/duration-show/duration-show.component';
import { CommunityComponent } from './public/community/community.component';
import { RegisterComponent } from './public/register/register.component';
import { UserShowComponent } from './public/user/user-show/user-show.component';
import { DocumentaryShowComponent } from './public/documentary/documentary-show/documentary-show.component';
import { UserActivityComponent } from './public/user/user-activity/user-activity.component';
import { UserWatchlistComponent } from './public/user/user-watchlist/user-watchlist.component';
import { UserAddedComponent } from './public/user/user-added/user-added.component';
import { DocumentaryAddComponent } from './public/documentary/documentary-add/documentary-add.component';
import { UserEditComponent } from './public/user/user-edit/user-edit.component';
import { AdminSubscriptionsComponent } from './admin/admin-subscriptions/admin-subscriptions.component';
import { OMDBService } from './services/omdb.service';
import { ChangeUsernameComponent } from './public/user/user-edit/change-username/change-username.component';
import { ChangePasswordComponent } from './public/user/user-edit/change-password/change-password.component';
import { ForgotPasswordComponent } from './public/user/user-edit/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './public/user/user-edit/reset-password/reset-password.component';
import { ForgotUsernameComponent } from './public/user/user-edit/forgot-username/forgot-username.component';
import { ActivateComponent } from './public/register/activate/activate.component';
import { ConfirmComponent } from './public/register/confirm/confirm.component';
import { AdminEmailsComponent } from './admin/admin-emails/admin-emails.component';
import { ResendComponent } from './public/register/resend/resend.component';
import { EmailNotConfirmedComponent } from './public/register/email-not-confirmed/email-not-confirmed.component';
import { AdminEmailAddComponent } from './admin/admin-emails/admin-email-add/admin-email-add.component';
import { AdminEmailDetailComponent } from './admin/admin-emails/admin-email-detail/admin-email-detail.component';
import { DocumentaryAddStandaloneComponent } from './public/documentary/documentary-add/documentary-add-standalone/documentary-add-standalone.component';
import { DocumentaryAddEpisodicComponent } from './public/documentary/documentary-add/documentary-add-episodic/documentary-add-episodic.component';
import { AdminSyncComponent } from './admin/admin-sync/admin-sync.component';
import { DocumentaryShowEpisodicComponent } from './public/documentary/documentary-add/documentary-add-episodic/documentary-show-episodic/documentary-show-episodic.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

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
    AdminStandaloneEditComponent,
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
    DurationShowComponent,
    CommunityComponent,
    RegisterComponent,
    UserShowComponent,
    DocumentaryShowComponent,
    UserActivityComponent,
    UserWatchlistComponent,
    UserAddedComponent,
    DocumentaryAddComponent,
    UserEditComponent,
    AdminSubscriptionsComponent,
    ChangeNameComponent,
    ChangeUsernameComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ForgotUsernameComponent,
    ActivateComponent,
    ConfirmComponent,
    AdminEmailsComponent,
    ResendComponent,
    EmailNotConfirmedComponent,
    AdminSeriesEditComponent,
    AdminEmailAddComponent,
    AdminEmailDetailComponent,
    DocumentaryAddStandaloneComponent,
    DocumentaryAddEpisodicComponent,
    AdminSyncComponent,
    DocumentaryShowEpisodicComponent,
    DocumentaryShowStandaloneComponent
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
    RecaptchaFormsModule,
    RecaptchaModule,
    RecaptchaModule.forRoot(),
    CarouselModule
  ],
  providers: [
    DocumentaryService,
    VideoSourceService,
    DocumentaryResolverService,
    AuthenticationService,
    YearService,
    DurationService,
    UserService,
    WatchlistService,
    SubscriptionService,
    OMDBService,
    YoutubeService,
    StatusService,
    AdminGuard,
    UserGuard,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Le-LMQUAAAAAIrbw_SOjzi8F3yxhxMEaYF_NCOd',
      } as RecaptchaSettings,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
