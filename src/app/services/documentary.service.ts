import { HeaderAccessTokenService } from './../helpers/header-access-token.service';
import { Documentary } from './../models/documentary.model';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentaryService extends DataService {
  private authenticationService: AuthenticationService;

  constructor(http: HttpClient, authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/documentary`, http);
    this.authenticationService = authenticationService;
   }

   getDocumentaryBySlug(slug: string) {
    let options = {};

    if (this.authenticationService.isAuthenticated()) {
        let accessToken = this.authenticationService.currentTokenValue.access_token;
        options = {
          params: new HttpParams()
            .append('access_token', accessToken)
        }
    }

     return this.get(slug, options);
   }

   getAllDocumentaries() {
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

   createDocumentary(documentary: Documentary) {
      let options;

      if (this.authenticationService.isAuthenticated()) {
          let accessToken = this.authenticationService.currentTokenValue.access_token;
          options = {
            params: new HttpParams()
              .append('access_token', accessToken)
          }
      }

      return this.create(documentary, options);
   }

   updateDocumentary(documentary: Documentary) {
    let options;

    if (this.authenticationService.isAuthenticated()) {
        let accessToken = this.authenticationService.currentTokenValue.access_token;
        options = {
          params: new HttpParams()
            .append('access_token', accessToken)
        }
    }
    
     return this.update(documentary, options);
   }
}
