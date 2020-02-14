import { AuthenticationService } from './authentication.service';
import { Token } from './../models/token.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class ActivityService extends DataService {
    private authenticationService: AuthenticationService;
    
  constructor(http: HttpClient, authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/activity`, http);
    this.authenticationService = authenticationService;
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