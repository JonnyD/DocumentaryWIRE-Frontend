import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class CommunityService extends DataService {
    private authenticationService: AuthenticationService;
    
  constructor(http: HttpClient, authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/community`, http);
    this.authenticationService = authenticationService;
   }

   getAllCommunityItems(params: HttpParams) {
    if (this.authenticationService.isAuthenticated()) {
        let accessToken = this.authenticationService.currentTokenValue.access_token;
        params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }

     return this.getAll(options);
   }
}