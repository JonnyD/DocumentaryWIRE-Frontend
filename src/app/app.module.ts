import { ChangeAboutMeComponent } from './public/user/user-edit/change-about-me/change-about-me.component';
import { AdminUserAddComponent } from './admin/admin-users/admin-user-add/admin-user-add.component';
import { ActivityResolverService } from './services/activity-resolver.service';
import { UserActiveComponent } from './public/user/user-active/user-active.component';
import { FeaturedService } from './services/featured.service';
import { SEOService } from './services/seo.service';
import { PopoverModule } from 'ngx-smart-popover';
import { DocumentaryShowStandaloneComponent } from './public/documentary/documentary-add/documentary-add-standalone/documentary-show-standalone/documentary-show-standalone.component';
import { AdminSeriesEditComponent } from './admin/admin-documentaries/admin-documentary-edit/admin-series-edit.component';
import { StatusService } from './services/status.service';
import { AdminStandaloneEditComponent } from './admin/admin-documentaries/admin-documentary-edit/admin-standalone-edit.component';
import { RecaptchaModule, RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaFormsModule } from 'ng-recaptcha';
import { UserGuard } from './public/user-guard.service';
import { ChangeNameComponent } from './public/user/user-edit/change-name/change-name.component';
import { YoutubeService } from './services/youtube.service';
import { FollowService } from './services/follow.service';
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
import { UserEditComponent } from './public/user/user-edit/user-edit.component';
import { AdminFollowsComponent } from './admin/admin-follows/admin-follows.component';
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
import { AdminDocumentaryDetailStandaloneComponent } from './admin/admin-documentaries/admin-documentary-detail/admin-documentary-detail-standalone/admin-documentary-detail-standalone.component';
import { AdminDocumentaryDetailSeriesComponent } from './admin/admin-documentaries/admin-documentary-detail/admin-documentary-detail-series/admin-documentary-detail-series.component';
import { SubscribeComponent } from './public/subscribe/subscribe.component';
import { UserNewComponent } from './public/user/user-new/user-new.component';
import { CommunityLatestComponent } from './public/community/community-latest/community-latest.component';
import { DurationListComponent } from './public/duration/duration-list/duration-list.component';
import { YearsListComponent } from './public/years/years-list/years-list.component';
import { DocumentaryRecentComponent } from './public/documentary/documentary-recent/documentary-recent.component';
import { DocumentaryRecentUpdatedComponent } from './public/documentary/documentary-recent-updated/documentary-recent-updated.component';
import { DocumentaryNewReleasesComponent } from './public/documentary/documentary-new-releases/documentary-new-releases.component';
import { DocumentaryPopularComponent } from './public/documentary/documentary-popular/documentary-popular.component';
import { DocumentaryTrendingComponent } from './public/documentary/documentary-trending/documentary-trending.component';
import { DocumentaryFeaturedComponent } from './public/documentary/documentary-featured/documentary-featured.component';
import { AdminActivityDetailComponent } from './admin/admin-activity/admin-activity-detail/admin-activity-detail.component';
import { AdminActivityEditComponent } from './admin/admin-activity/admin-activity-edit/admin-activity-edit.component';
import { AdminWatchlistsComponent } from './admin/admin-watchlists/admin-watchlists.component';
import { AdminWatchlistDetailComponent } from './admin/admin-watchlists/admin-watchlist-detail/admin-watchlist-detail.component';
import { AdminWatchlistEditComponent } from './admin/admin-watchlists/admin-watchlist-edit/admin-watchlist-edit.component';
import { CategoryService } from './services/category.service';
import { CommnentService } from './services/comment.service';
import { ChatComponent } from './public/chat/chat.component';
import { AdminContactComponent } from './admin/admin-contact/admin-contact.component';
import { AdminContactDetailComponent } from './admin/admin-contact/admin-contact-detail/admin-contact-detail.component';
import { AdminContactEditComponent } from './admin/admin-contact/admin-contact-edit/admin-contact-edit.component';
import { ContactComponent } from './public/contact/contact.component';
import { UserShowDocumentariesComponent } from './public/user/user-show/user-show-documentaries/user-show-documentaries.component';
import { UserShowFollowingComponent } from './public/user/user-show/user-show-following/user-show-following.component';
import { UserShowFollowersComponent } from './public/user/user-show/user-show-followers/user-show-followers.component';
import { ChangeEmailComponent } from './public/user/user-edit/change-email/change-email.component';
import { ChangeAboutmeComponent } from './public/user/user-edit/change-aboutme/change-aboutme.component';
import { ChangeAvatarComponent } from './public/user/user-edit/change-avatar/change-avatar.component';

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
    UserEditComponent,
    AdminFollowsComponent,
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
    DocumentaryShowStandaloneComponent,
    AdminDocumentaryDetailStandaloneComponent,
    AdminDocumentaryDetailSeriesComponent,
    SubscribeComponent,
    UserActiveComponent,
    UserNewComponent,
    CommunityLatestComponent,
    DurationListComponent,
    YearsListComponent,
    DocumentaryRecentComponent,
    DocumentaryRecentUpdatedComponent,
    DocumentaryNewReleasesComponent,
    DocumentaryPopularComponent,
    DocumentaryTrendingComponent,
    DocumentaryFeaturedComponent,
    AdminActivityDetailComponent,
    AdminActivityEditComponent,
    AdminWatchlistsComponent,
    AdminWatchlistDetailComponent,
    AdminWatchlistEditComponent,
    ChatComponent,
    AdminContactComponent,
    AdminContactDetailComponent,
    AdminContactEditComponent,
    ContactComponent,
    AdminUserAddComponent,
    UserShowDocumentariesComponent,
    UserShowFollowingComponent,
    UserShowFollowersComponent,
    ChangeEmailComponent,
    ChangeAboutMeComponent,
    ChangeAvatarComponent
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
    CarouselModule,
    PopoverModule
  ],
  providers: [
    DocumentaryService,
    VideoSourceService,
    DocumentaryResolverService,
    ActivityResolverService,
    AuthenticationService,
    YearService,
    DurationService,
    UserService,
    WatchlistService,
    FollowService,
    OMDBService,
    YoutubeService,
    StatusService,
    FeaturedService,
    CategoryService,
    CommnentService,
    AdminGuard,
    UserGuard,
    SEOService,
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
