import { HeaderAccessTokenService } from './../helpers/header-access-token.service';
import { Documentary } from './../models/documentary.model';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Email } from '../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService extends DataService {
  private authenticationService: AuthenticationService;

  constructor(
    http: HttpClient,
    authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/email`, http);
    this.authenticationService = authenticationService;
  }

  getSubscribedOptions() {
    return [
      { id: 'yes', name: 'Yes' },
      { id: 'no', name: 'No' }
    ];
  }

  getSources() {
    return [
      { id: 'user', name: 'User' },
      { id: 'comment', name: 'Comment' },
      { id: 'wz-feedburner', name: 'WZ Feedburner' },
      { id: 'tns_feedburner', name: 'TNS Feedburner' },
      { id: 'dw-feedburner-pending', name: 'DW Feedburner Pending' },
      { id: 'dw-feedburner-active', name: 'DW Feedburner Active' }
    ];
  }

  getAllEmails(params: HttpParams) {
    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }

    return this.getAll(options);
  }

  getEmailById(id: number) {
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

  editEmail(id, email: Email) {
    let params = new HttpParams();

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken);
    }

    let options = {
      params: params
    }

    return this.patch(id, email, options);
  }

  createEmail(resource) {
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