import { ChangeEmailComponent } from './public/user/user-edit/change-email/change-email.component';
import { UserShowFollowingComponent } from './public/user/user-show/user-show-following/user-show-following.component';
import { UserShowDocumentariesComponent } from './public/user/user-show/user-show-documentaries/user-show-documentaries.component';
import { AdminUserAddComponent } from './admin/admin-users/admin-user-add/admin-user-add.component';
import { ContactComponent } from './public/contact/contact.component';
import { AdminContactEditComponent } from './admin/admin-contact/admin-contact-edit/admin-contact-edit.component';
import { ContactResolverService } from './services/contact-resolver.service';
import { AdminContactDetailComponent } from './admin/admin-contact/admin-contact-detail/admin-contact-detail.component';
import { AdminContactComponent } from './admin/admin-contact/admin-contact.component';
import { AdminWatchlistEditComponent } from './admin/admin-watchlists/admin-watchlist-edit/admin-watchlist-edit.component';
import { WatchlistResolverService } from './services/watchlist-resolver.service';
import { AdminWatchlistDetailComponent } from './admin/admin-watchlists/admin-watchlist-detail/admin-watchlist-detail.component';
import { AdminWatchlistsComponent } from './admin/admin-watchlists/admin-watchlists.component';
import { AdminActivityEditComponent } from './admin/admin-activity/admin-activity-edit/admin-activity-edit.component';
import { ActivityResolverService } from './services/activity-resolver.service';
import { AdminActivityDetailComponent } from './admin/admin-activity/admin-activity-detail/admin-activity-detail.component';
import { AdminDocumentaryDetailSeriesComponent } from './admin/admin-documentaries/admin-documentary-detail/admin-documentary-detail-series/admin-documentary-detail-series.component';
import { AdminDocumentaryDetailStandaloneComponent } from './admin/admin-documentaries/admin-documentary-detail/admin-documentary-detail-standalone/admin-documentary-detail-standalone.component';
import { DocumentaryShowStandaloneComponent } from './public/documentary/documentary-add/documentary-add-standalone/documentary-show-standalone/documentary-show-standalone.component';
import { DocumentaryShowEpisodicComponent } from './public/documentary/documentary-add/documentary-add-episodic/documentary-show-episodic/documentary-show-episodic.component';
import { HomeResolverService } from './services/home-resolver.service';
import { AdminSyncComponent } from './admin/admin-sync/admin-sync.component';
import { DocumentaryAddEpisodicComponent } from './public/documentary/documentary-add/documentary-add-episodic/documentary-add-episodic.component';
import { DocumentaryAddStandaloneComponent } from './public/documentary/documentary-add/documentary-add-standalone/documentary-add-standalone.component';
import { AdminEmailDetailComponent } from './admin/admin-emails/admin-email-detail/admin-email-detail.component';
import { AdminEmailAddComponent } from './admin/admin-emails/admin-email-add/admin-email-add.component';
import { AdminSeriesEditComponent } from './admin/admin-documentaries/admin-documentary-edit/admin-series-edit.component';
import { ResendComponent } from './public/register/resend/resend.component';
import { EmailNotConfirmedComponent } from './public/register/email-not-confirmed/email-not-confirmed.component';
import { AdminEmailsComponent } from './admin/admin-emails/admin-emails.component';
import { AdminStandaloneEditComponent } from './admin/admin-documentaries/admin-documentary-edit/admin-standalone-edit.component';
import { ConfirmComponent } from './public/register/confirm/confirm.component';
import { ActivateComponent } from './public/register/activate/activate.component';
import { UserGuard } from './public/user-guard.service';
import { ForgotUsernameComponent } from './public/user/user-edit/forgot-username/forgot-username.component';
import { ResetPasswordComponent } from './public/user/user-edit/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './public/user/user-edit/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './public/user/user-edit/change-password/change-password.component';
import { ChangeUsernameComponent } from './public/user/user-edit/change-username/change-username.component';
import { ChangeNameComponent } from './public/user/user-edit/change-name/change-name.component';
import { AuthneticatedUserResolverService } from './services/authenticated-user-resolver.service';
import { AdminUserEditComponent } from './admin/admin-users/admin-user-edit/admin-user-edit.component';
import { AdminFollowsComponent } from './admin/admin-follows/admin-follows.component';
import { UserEditComponent } from './public/user/user-edit/user-edit.component';
import { UserWatchlistComponent } from './public/user/user-watchlist/user-watchlist.component';
import { UserActivityComponent } from './public/user/user-activity/user-activity.component';
import { UserShowComponent } from './public/user/user-show/user-show.component';
import { AdminUserResolverService } from './services/admin-user-resolver.service';
import { RegisterComponent } from './public/register/register.component';
import { CommunityComponent } from './public/community/community.component';
import { DurationResolverService } from './services/duration-resolver.service';
import { YearResolverService } from './services/year-resolver.service';
import { YearShowComponent } from './public/years/year-show/year-show.component';
import { CategoryShowComponent } from './public/categories/category-show/category-show.component';
import { BrowseComponent } from './public/browse/browse.component';
import { HomeComponent } from './public/home/home.component';
import { AdminUserDetailComponent } from './admin/admin-users/admin-user-detail/admin-user-detail.component';
import { AdminCategoryEditComponent } from './admin/admin-categories/admin-category-edit/admin-category-edit.component';
import { CategoryResolverService } from './services/category-resolver.service';
import { AdminCategoryDetailComponent } from './admin/admin-categories/admin-category-detail/admin-category-detail.component';
import { AdminCommentEditComponent } from './admin/admin-comments/admin-comment-edit/admin-comment-edit.component';
import { CommentResolverService } from './services/comment-resolver.service';
import { AdminCommentDetailComponent } from './admin/admin-comments/admin-comment-detail/admin-comment-detail.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminGuard } from './admin/admin-guard.service';
import { LogoutComponent } from './public/logout/logout.component';
import { LoginComponent } from './public/login/login.component';
import { AdminDocumentariesAddComponent } from './admin/admin-documentaries/admin-documentaries-add/admin-documentaries-add.component';
import { AdminVideoSourceDetailComponent } from './admin/admin-video-sources/admin-video-source-detail/admin-video-source-detail.component';
import { VideoSourceResolverService } from './services/video-source-resolver.service';
import { AdminVideoSourceEditComponent } from './admin/admin-video-sources/admin-video-source-edit/admin-video-source-edit.component';
import { AdminVideoSourcesComponent } from './admin/admin-video-sources/admin-video-sources.component';
import { AdminDocumentaryDetailComponent } from './admin/admin-documentaries/admin-documentary-detail/admin-documentary-detail.component';
import { AdminActivityComponent } from './admin/admin-activity/admin-activity.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminCommentsComponent } from './admin/admin-comments/admin-comments.component';
import { AdminDocumentariesComponent } from './admin/admin-documentaries/admin-documentaries.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentaryResolverService } from './services/documentary-resolver.service';
import { DurationShowComponent } from './public/duration/duration-show/duration-show.component';
import { UserResolverService } from './services/user-resolver.service';
import { DocumentaryShowComponent } from './public/documentary/documentary-show/documentary-show.component';
import { UserAddedComponent } from './public/user/user-added/user-added.component';
import { UserShowFollowersComponent } from './public/user/user-show/user-show-followers/user-show-followers.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: 'browse', component: BrowseComponent },
  {
    path: 'category/:slug',
    component: CategoryShowComponent,
    resolve: [CategoryResolverService]
  },
  {
    path: 'year/:id',
    component: YearShowComponent,
    resolve: [YearResolverService]
  },
  {
    path: 'duration/:slug',
    component: DurationShowComponent,
    resolve: [DurationResolverService]
  },
  {
    path: 'community',
    canActivate: [UserGuard],
    component: CommunityComponent
  },
  {
    path: 'user',
    canActivate: [UserGuard],
    children: [
      {
        path: 'edit',
        component: UserEditComponent,
        resolve: [AuthneticatedUserResolverService]
      },
      {
        path: 'edit/change-name',
        component: ChangeNameComponent,
        resolve: [AuthneticatedUserResolverService]
      },
      {
        path: 'edit/change-username',
        component: ChangeUsernameComponent,
        resolve: [AuthneticatedUserResolverService]
      },
      {
        path: 'edit/change-email',
        component: ChangeEmailComponent,
        resolve: [AuthneticatedUserResolverService]
      },
      {
        path: 'edit/change-password',
        component: ChangePasswordComponent,
        resolve: [AuthneticatedUserResolverService]
      },
      {
        path: ':username',
        component: UserShowComponent,
        resolve: [UserResolverService]
      },
      {
        path: ':username/documentaries',
        component: UserShowDocumentariesComponent,
        resolve: [UserResolverService]
      },
      {
        path: ':username/following',
        component: UserShowFollowingComponent,
        resolve: [UserResolverService]
      },
      {
        path: ':username/followers',
        component: UserShowFollowersComponent,
        resolve: [UserResolverService]
      },
      {
        path: ':username/added',
        component: UserAddedComponent,
        resolve: [UserResolverService]
      },
      {
        path: ':username/watchlist',
        component: UserWatchlistComponent,
        resolve: [UserResolverService]
      },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate', component: ActivateComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'email-not-confirmed/:email', component: EmailNotConfirmedComponent },
  { path: 'resend/:email', component: ResendComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'forgot-username', component: ForgotUsernameComponent },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    component: AdminHomeComponent,
    children: [
      {
        path: 'sync',
        component: AdminSyncComponent
      },
      {
        path: 'documentaries',
        component: AdminDocumentariesComponent
      },
      {
        path: 'documentaries/standalone/add',
        component: AdminStandaloneEditComponent
      },
      {
        path: 'documentaries/series/add',
        component: AdminSeriesEditComponent
      },
      {
        path: 'documentaries/standalone/:slug/edit',
        component: AdminStandaloneEditComponent
      },
      {
        path: 'documentaries/series/:slug/edit',
        component: AdminSeriesEditComponent
      },
      {
        path: 'documentaries/standalone/:slug',
        component: AdminDocumentaryDetailStandaloneComponent,
        resolve: [DocumentaryResolverService]
      },
      {
        path: 'documentaries/series/:slug',
        component: AdminDocumentaryDetailSeriesComponent,
        resolve: [DocumentaryResolverService]
      },
      {
        path: 'categories',
        component: AdminCategoriesComponent
      },
      {
        path: 'categories/:slug',
        component: AdminCategoryDetailComponent,
        resolve: [CategoryResolverService]
      },
      {
        path: 'categories/:slug/edit',
        component: AdminCategoryEditComponent,
        resolve: [CategoryResolverService]
      },
      {
        path: 'video-sources',
        component: AdminVideoSourcesComponent
      },
      {
        path: 'video-sources/:id',
        component: AdminVideoSourceDetailComponent,
        resolve: [VideoSourceResolverService]
      },
      {
        path: 'video-sources/:id/edit',
        component: AdminVideoSourceEditComponent,
        resolve: [VideoSourceResolverService]
      },
      {
        path: 'comments',
        component: AdminCommentsComponent
      },
      {
        path: 'comments/:id',
        component: AdminCommentDetailComponent,
        resolve: [CommentResolverService]
      },
      {
        path: 'comments/:id/edit',
        component: AdminCommentEditComponent,
        resolve: [CommentResolverService]
      },
      {
        path: 'users',
        component: AdminUsersComponent
      },
      {
        path: 'users/add',
        component: AdminUserAddComponent
      },
      {
        path: 'users/:username',
        component: AdminUserDetailComponent,
        resolve: [UserResolverService]
      },
      {
        path: 'users/:username/edit',
        component: AdminUserEditComponent,
        resolve: [UserResolverService]
      },
      {
        path: 'follows',
        component: AdminFollowsComponent
      },
      {
        path: 'watchlists',
        component: AdminWatchlistsComponent
      },
      {
        path: 'watchlists/:id',
        component: AdminWatchlistDetailComponent,
        resolve: [WatchlistResolverService]
      },
      {
        path: 'watchlists/:id/edit',
        component: AdminWatchlistEditComponent,
        resolve: [WatchlistResolverService]
      },
      {
        path: 'activity',
        component: AdminActivityComponent
      },
      {
        path: 'activity/:id',
        component: AdminActivityDetailComponent,
        resolve: [ActivityResolverService]
      },
      {
        path: 'activity/:id/edit',
        component: AdminActivityEditComponent,
        resolve: [ActivityResolverService]
      },
      {
        path: 'emails',
        component: AdminEmailsComponent
      },
      {
        path: 'emails/add',
        component: AdminEmailAddComponent
      },
      {
        path: 'emails/:id',
        component: AdminEmailDetailComponent
      },
      {
        path: 'emails/:id/edit',
        component: AdminEmailAddComponent
      },
      {
        path: 'contacts',
        component: AdminContactComponent
      },
      {
        path: 'contacts/:id',
        component: AdminContactDetailComponent,
        resolve: [ContactResolverService]
      },
      {
        path: 'contacts/:id/edit',
        component: AdminContactEditComponent,
        resolve: [ContactResolverService]
      },
    ]
  },
  {
    path: 'add',
    canActivate: [UserGuard],
    children: [
      {
        path: 'standalone',
        component: DocumentaryAddStandaloneComponent,
      },
      {
        path: 'standalone/show/:slug',
        component: DocumentaryShowStandaloneComponent,
        resolve: [DocumentaryResolverService]
      },
      {
        path: 'standalone/edit/:slug',
        component: DocumentaryAddStandaloneComponent,
      },
      {
        path: 'episodic/show/:slug',
        component: DocumentaryShowEpisodicComponent,
        resolve: [DocumentaryResolverService]
      },
      {
        path: 'episodic/edit/:slug',
        component: DocumentaryAddEpisodicComponent,
      },
      {
        path: 'episodic',
        component: DocumentaryAddEpisodicComponent,
      }
    ]
  },
  {
    path: ':slug',
    component: DocumentaryShowComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
