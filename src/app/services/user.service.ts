import { User } from './../models/user.model';
import { HeaderAccessTokenService } from './../helpers/header-access-token.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {
 
  private authenticationService: AuthenticationService;

  constructor(http: HttpClient, authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/user`, http);
    this.authenticationService = authenticationService;
   }

    checkUsernameExists(username: string) {
        return this.getUserByUsername(username);
    }

   getMe() {
    let options = {};

    if (this.authenticationService.isAuthenticated()) {
        let accessToken = this.authenticationService.currentTokenValue.access_token;
        options = {
          params: new HttpParams()
            .append('access_token', accessToken)
        }
    }
    
    return this.get('me', options);
   }

   getUserById(id: number) {
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

   getUserByUsername(username: string) {
    let options = {};

    if (this.authenticationService.isAuthenticated()) {
        let accessToken = this.authenticationService.currentTokenValue.access_token;
        options = {
          params: new HttpParams()
            .append('access_token', accessToken)
        }
    }

    return this.get(username, options);
   }

   getAllUsers(params: HttpParams) {
        if (this.authenticationService.isAuthenticated()) {
            let accessToken = this.authenticationService.currentTokenValue.access_token;
            params = params.append('access_token', accessToken)
        }

        let options = {
            params: params
        }
        
        return this.getAll(options);
    }
    
    getNewestUsers(params: HttpParams) {
        params = params.append('sort', 'createdAt-desc');
        params = params.append('enabled', 'true');

        if (this.authenticationService.isAuthenticated()) {
            let accessToken = this.authenticationService.currentTokenValue.access_token;
            params = params.append('access_token', accessToken)
        }

        let options = {
            params: params
        }
        
        return this.getAll(options);
    }
    
    getActiveUsers(params: HttpParams) {
        params = params.append('sort', 'lastLogin-desc');
        params = params.append('enabled', 'true');

        if (this.authenticationService.isAuthenticated()) {
            let accessToken = this.authenticationService.currentTokenValue.access_token;
            params = params.append('access_token', accessToken)
        }

        let options = {
            params: params
        }
        
        return this.getAll(options);
    }

    createUser(user: User) {
        let options = {};
  
        return this.create(user, options);
     }

     updateUser(user: User) {
        let options = {};

        if (this.authenticationService.isAuthenticated()) {
            let accessToken = this.authenticationService.currentTokenValue.access_token;
            options = {
            params: new HttpParams()
                .append('access_token', accessToken)
            }
        }

         return this.update(user, options);
     }

     forgotPassword(username: string) {
        let options = {};

        let resource = {
            "username": username
        };

        return this.post('/forgot-password', resource, options);
     }

     resetPassword(username: string, resetKey: string, password: string) {
        let options = {};

        let resource = {
            "username": username,
            "reset_key": resetKey,
            "password": password
        };

        return this.post('/reset-password', resource, options);
     }

     forgotUsername(email: string) {
        let options = {};

        let resource = {
            "email": email
        };

        return this.post('/forgot-username', resource, options);
     }

     confirm(username: string, confirmationToken: string) {
        let params = new HttpParams();
        params = params.append('username', username);
        params = params.append('confirmation_token', confirmationToken);

        let options = {
            params: params
        }

        return this.get('confirm', options);
       }
}
