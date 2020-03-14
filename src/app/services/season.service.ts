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
export class SeasonService extends DataService {

  private authenticationService: AuthenticationService;

  constructor(
    http: HttpClient,
    authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/season`, http);
    this.authenticationService = authenticationService;
  }

  createSeason(resource) {
    let params = new HttpParams();

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }
    
    return this.create(resource, options);
  }
}