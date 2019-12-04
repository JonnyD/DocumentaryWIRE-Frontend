import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HeaderAccessTokenService } from './../helpers/header-access-token.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class StatusService extends DataService {
   
  private authenticationService: AuthenticationService;

  constructor(http: HttpClient, authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/status`, http);
    this.authenticationService = authenticationService;
   }

   getAllStatuses() {
    return [
        {
          value: 'pending',
          name: 'Pending'
        },
        {
          value: 'publish',
          name: 'Published'
        }
      ];
   }
}