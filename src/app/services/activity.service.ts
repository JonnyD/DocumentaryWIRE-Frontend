import { ComponentItem } from './../models/component-item.model';
import { Type } from './../models/type.model';
import { AuthenticationService } from './authentication.service';
import { Token } from './../models/token.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';
import { typeSourceSpan } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class ActivityService extends DataService {
  private authenticationService: AuthenticationService;

  constructor(http: HttpClient, authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/activity`, http);
    this.authenticationService = authenticationService;
  }

  getTypes() {
    return [
      { id: 'joined', name: 'Joined' },
      { id: 'comment', name: 'Comment' },
      { id: 'watchlist', name: 'Watchlist' },
      { id: 'added', name: 'Added' }
    ];
  }

  getComponents() {
    return [
      { id: 'user', name: 'User' },
      { id: 'documentary', name: 'Documentary' }
    ];
  }

  editActivity(id, resource) {
    let params = new HttpParams();

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }

    return this.patch(id, resource, options);
  }

  getActivityById(id: number) {
    let options = {};

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      options = {
        params: new HttpParams()
          .append('access_token', accessToken)
      }
    }

    return this.get(id, options);
  }

  getAllActivities(params: HttpParams) {
    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }

    return this.getAll(options);
  }

  getActivityForRecentWidget(params: HttpParams) {
    params = params.append("show", "widget");

    let options = {
      params: params
    }

    return this.getAll(options);
  }
}