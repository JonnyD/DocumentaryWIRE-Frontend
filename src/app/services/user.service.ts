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
        params = params.append('sort', 'activatedAt-desc');
        params = params.append('enabled', 'true');

        let options = {
            params: params
        }

        return this.getAll(options);
    }

    getActiveUsers(params: HttpParams) {
        params = params.append('sort', 'lastLogin-desc');
        params = params.append('enabled', 'true');

        let options = {
            params: params
        }

        return this.getAll(options);
    }

    createUser(user: User) {
        let options = {};

        if (this.authenticationService.isAuthenticated()) {
            let accessToken = this.authenticationService.currentTokenValue.access_token;
            options = {
                params: new HttpParams()
                    .append('access_token', accessToken)
            }
        }

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

        return this.patch(user.id, user, options);
    }

    forgotPassword(username: string) {
        let options = {};

        let resource = {
            "username": username
        };

        return this.post('/forgot-password', resource, options);
    }

    changeEmail(id: string, email: string) {
        let options = {};

        if (this.authenticationService.isAuthenticated()) {
            let accessToken = this.authenticationService.currentTokenValue.access_token;
            options = {
                params: new HttpParams()
                    .append('access_token', accessToken)
            }
        }

        let resource = {
            "email": email
        };

        let url = '/change-email/' + id;
        return this.post(url, resource, options);
    }
    
    changeAboutMe(id: string, aboutMe: string) {
        let options = {};

        if (this.authenticationService.isAuthenticated()) {
            let accessToken = this.authenticationService.currentTokenValue.access_token;
            options = {
                params: new HttpParams()
                    .append('access_token', accessToken)
            }
        }

        let resource = {
            "aboutMe": aboutMe
        };

        let url = '/' + id + '/change-about-me';
        return this.post(url, resource, options);
    }
    
    changeAvatar(id: string, avatar: string) {
        let options = {};

        if (this.authenticationService.isAuthenticated()) {
            let accessToken = this.authenticationService.currentTokenValue.access_token;
            options = {
                params: new HttpParams()
                    .append('access_token', accessToken)
            }
        }

        let resource = {
            "avatar": avatar
        };

        let url = '/' + id + '/change-avatar';
        return this.post(url, resource, options);
    }
    
    removeAvatar(id: string) {
        let options = {};

        if (this.authenticationService.isAuthenticated()) {
            let accessToken = this.authenticationService.currentTokenValue.access_token;
            options = {
                params: new HttpParams()
                    .append('access_token', accessToken)
            }
        }

        let resource = {};

        let url = '/' + id + '/remove-avatar';
        return this.post(url, resource, options);
    }

    changePassword(id: string, resource) {
        let options = {};

        if (this.authenticationService.isAuthenticated()) {
            let accessToken = this.authenticationService.currentTokenValue.access_token;
            options = {
                params: new HttpParams()
                    .append('access_token', accessToken)
            }
        }

        let url = '/' + id + '/change-password';
        return this.post(url, resource, options);
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

    resend(email: string) {
        let params = new HttpParams();
        params = params.append('email', email);

        let options = {
            params: params
        }

        return this.get('resend', options);
    }
}
