import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminDocumentariesComponent } from './admin/admin-documentaries/admin-documentaries.component';
import { DocumentaryService } from './services/documentary.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminCommentsComponent } from './admin/admin-comments/admin-comments.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminActivityComponent } from './admin/admin-activity/admin-activity.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminHomeComponent,
    AdminDocumentariesComponent,
    AdminCommentsComponent,
    AdminUsersComponent,
    AdminActivityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DocumentaryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
