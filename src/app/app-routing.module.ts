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

const routes: Routes = [
  {path: 'admin', component: AdminHomeComponent,
    children: [
      { 
        path: 'documentaries', 
        component: AdminDocumentariesComponent 
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
        path: 'video-sources', 
        component: AdminVideoSourcesComponent
      },
      { 
        path: 'video-sources/:id/edit', 
        component: AdminVideoSourceEditComponent,
        resolve: [VideoSourceResolverService]
      },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
