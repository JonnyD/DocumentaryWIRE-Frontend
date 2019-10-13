import { HeaderAccessTokenService } from './../helpers/header-access-token.service';
import { Documentary } from './../models/documentary.model';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OMDBService extends DataService {
  private authenticationService: AuthenticationService;

  constructor(
    http: HttpClient,
    authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/omdb`, http);
    this.authenticationService = authenticationService;
   }

   getSearchedDocumentaries(title: string) {
    let params = new HttpParams();

    params = params.append('title', title);

    if (this.authenticationService.isAuthenticated()) {
        let accessToken = this.authenticationService.currentTokenValue.access_token;
        params = params.append('access_token', accessToken)
    }

    let options = {
        params: params
    }
    
    return this.get('search', options);
   }

   getByImdbId(imdbId: string) {
    let params = new HttpParams();

    if (this.authenticationService.isAuthenticated()) {
        let accessToken = this.authenticationService.currentTokenValue.access_token;
        params = params.append('access_token', accessToken)
    }

    let options = {
        params: params
    }
    
    return this.get(imdbId, options);
   }
}
