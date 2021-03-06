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
export class SyncService extends DataService {

    private authenticationService: AuthenticationService;

    constructor(http: HttpClient, authenticationService: AuthenticationService) {
        super(`${environment.apiUrl}/api/v1/sync`, http);
        this.authenticationService = authenticationService;
    }

    sync() {
        let options = {};

        if (this.authenticationService.isAuthenticated()) {
            let accessToken = this.authenticationService.currentTokenValue.access_token;
            options = {
                params: new HttpParams()
                    .append('access_token', accessToken)
            }
        }

        return this.get('', options);
    }
}
