import { AdminActivityComponent } from './admin/admin-activity/admin-activity.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminCommentsComponent } from './admin/admin-comments/admin-comments.component';
import { AdminDocumentariesComponent } from './admin/admin-documentaries/admin-documentaries.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'admin', component: AdminHomeComponent,
    children: [
      { path: 'documentaries', component: AdminDocumentariesComponent },
      { path: 'comments', component: AdminCommentsComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'activity', component: AdminActivityComponent },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
