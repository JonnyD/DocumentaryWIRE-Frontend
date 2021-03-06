import { HeaderAccessTokenService } from './../helpers/header-access-token.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoSourceService extends DataService {

  private authenticationService: AuthenticationService;

  constructor(http: HttpClient, authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/video-source`, http);
    this.authenticationService = authenticationService;
   }

   getEmbedAllowedOptions() {
     return ["yes", "no"];
   }

   getStatuses() {
     return ["enabled", "disabled"];
   }
   
   getVideoSourceById(id: number) {
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

   getAllVideoSources() {
    let options = {};

    if (this.authenticationService.isAuthenticated()) {
        let accessToken = this.authenticationService.currentTokenValue.access_token;
        options = {
          params: new HttpParams()
            .append('access_token', accessToken)
        }
    }
     return this.getAll(options);
    }

    editVideoSource(id, videoSource) {
      let params = new HttpParams();
    
      if (this.authenticationService.isAuthenticated()) {
          let accessToken = this.authenticationService.currentTokenValue.access_token;
          params = params.append('access_token', accessToken)
      }

      let options = {
          params: params
      }

      return this.patch(id, videoSource, options);
    }
}
