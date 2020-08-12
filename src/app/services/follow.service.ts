import { User } from '../models/user.model';
import { HeaderAccessTokenService } from '../helpers/header-access-token.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService extends DataService {

  private authenticationService: AuthenticationService;

  constructor(http: HttpClient, authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/follow`, http);
    this.authenticationService = authenticationService;
  }

  getFollowById(id: number) {
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

  getFollowByUserFromIdAndUserToId(userFromId: number, userToId: number) {
    let options = {};

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      options = {
        params: new HttpParams()
          .append('access_token', accessToken)
      }
    }

    console.log("HELLLLLLLO");
    let id = userFromId + '/' + userToId;
    return this.get(id, options);
  }

  getAllFollows(params: HttpParams) {
    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }

    return this.getAll(options);
  }

  createFollow(follow: any) {
    let params = new HttpParams();

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }

    return this.create(follow, options);
  }

  deleteFollow(id: number) {
    let params = new HttpParams();

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }

    return this.delete(id, options);
  }

  getFollowByIdFromArray(followId: number, following) {
    let follow = null;

    for (var key in following) {
      let followingItem = following[key];
      if (followingItem.id === followId) {
        follow = followingItem;
        break;
      }
    }

    return follow;
  }
}
