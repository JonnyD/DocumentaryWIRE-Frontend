import { DocumentaryShowEpisodicComponent } from './public/documentary/documentary-add/documentary-add-episodic/documentary-show-episodic/documentary-show-episodic.component';
import { DocumentaryAddComponent } from './public/documentary/documentary-add/documentary-add.component';
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
import { AdminSubscriptionsComponent } from './admin/admin-subscriptions/admin-subscriptions.component';
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

const routes: Routes = [
  { path: '', component: HomeComponent },
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
    component: CommunityComponent
  },
  { 
    path: 'user/edit', 
    component: UserEditComponent,
    resolve: [AuthneticatedUserResolverService]
  },
  { 
    path: 'user/edit/change-name', 
    component: ChangeNameComponent,
    resolve: [AuthneticatedUserResolverService]
  },
  { 
    path: 'user/edit/change-username', 
    component: ChangeUsernameComponent,
    resolve: [AuthneticatedUserResolverService]
  },
  { 
    path: 'user/edit/change-password', 
    component: ChangePasswordComponent,
    resolve: [AuthneticatedUserResolverService]
  },
  { 
    path: 'user/edit/forgot-password', 
    component: ForgotPasswordComponent
  },
  { 
    path: 'user/edit/reset-password', 
    component: ResetPasswordComponent
  },
  { 
    path: 'user/edit/forgot-username', 
    component: ForgotUsernameComponent
  },
  { 
    path: 'user/:username', 
    component: UserShowComponent,
    resolve: [UserResolverService]
  },
  { 
    path: 'user/:username/activity', 
    component: UserActivityComponent,
    resolve: [UserResolverService]
  },
  { 
    path: 'user/:username/added', 
    component: UserAddedComponent,
    resolve: [UserResolverService]
  },
  { 
    path: 'user/:username/watchlist', 
    component: UserWatchlistComponent,
    resolve: [UserResolverService]
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate', component: ActivateComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'email-not-confirmed/:email', component: EmailNotConfirmedComponent },
  { path: 'resend/:email', component: ResendComponent },
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
        path: 'documentaries/:slug', 
        component: AdminDocumentaryDetailComponent,
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
        path: 'subscriptions', 
        component: AdminSubscriptionsComponent 
      },
      { 
        path: 'activity', 
        component: AdminActivityComponent 
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
    ]
  },
  { 
    path: 'add/standalone',
    canActivate: [UserGuard],
    component: DocumentaryAddStandaloneComponent,
  },  
  { 
    path: 'add/episodic/show/:slug',
    canActivate: [UserGuard],
    component: DocumentaryShowEpisodicComponent,
    resolve: [DocumentaryResolverService]
  },  
  { 
    path: 'add/episodic',
    canActivate: [UserGuard],
    component: DocumentaryAddEpisodicComponent,
  },  
  { 
    path: 'add', 
    canActivate: [UserGuard],
    component: DocumentaryAddComponent
  },
  { 
    path: ':slug', 
    component: DocumentaryShowComponent,
    resolve: [DocumentaryResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
