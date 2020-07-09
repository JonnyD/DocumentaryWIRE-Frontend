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
export class CommnentService extends DataService {
  private authenticationService: AuthenticationService;

  constructor(
    http: HttpClient,
    authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/comment`, http);
    this.authenticationService = authenticationService;
  }

  getCommentById(id: number) {
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

  getAllComments(params: HttpParams) {
    if (params.has('commentPage')) {
      params = params.append('page', params.get('commentPage'));
      params = params.delete('commentPage');
    }
    
    if (params.has('commentStatus')) {
      params = params.append('status', params.get('commentStatus'));
      params = params.delete('commentStatus');
    }

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }

    return this.getAll(options);
  }

  getAllCommentsByDocumentary(documentaryId: number, params: HttpParams) {
    params = params.append('documentary', documentaryId.toString());

    return this.getAllComments(params);
  }

  editComment(id, resource) {
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
}