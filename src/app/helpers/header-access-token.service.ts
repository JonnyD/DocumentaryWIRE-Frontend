import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HeaderAccessTokenService {
    private authenticationService: AuthenticationService;

    constructor(authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
    }

    assignAccessToken() {
        let options = {};

        if (this.authenticationService.isAuthenticated()) {
            let accessToken = this.authenticationService.currentTokenValue.access_token;
            options = {
                headers: new HttpHeaders()
                .append('access_token', accessToken),
            }
        }

        return options;
    }
}