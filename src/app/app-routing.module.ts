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
import { AdminDocumentaryEditComponent } from './admin/admin-documentaries/admin-documentary-edit/admin-documentary-edit.component';
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
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', canActivate: [AdminGuard], component: AdminHomeComponent,
    children: [
      { 
        path: 'documentaries', 
        component: AdminDocumentariesComponent 
      },
      { 
        path: 'documentaries/add', 
        component: AdminDocumentariesAddComponent 
      },
      { 
        path: 'documentaries/:slug', 
        component: AdminDocumentaryDetailComponent,
        resolve: [DocumentaryResolverService]
      },
      { 
        path: 'documentaries/:slug/edit', 
        component: AdminDocumentaryEditComponent,
        resolve: [DocumentaryResolverService]
      },
      { 
        path: 'categories', 
        component: AdminCategoriesComponent 
      },
      { 
        path: 'categories/:id', 
        component: AdminCategoryDetailComponent,
        resolve: [CategoryResolverService]
      },
      { 
        path: 'categories/:id/edit', 
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
        path: 'users/:id', 
        component: AdminUserDetailComponent,
        resolve: [AdminUserResolverService]
      },
    ]
  },
  { 
    path: ':slug', 
    component: DocumentaryShowComponent,
    resolve: [DocumentaryResolverService]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
