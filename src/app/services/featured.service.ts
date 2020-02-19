import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HeaderAccessTokenService } from './../helpers/header-access-token.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class FeaturedService {
    getFeaturedOptions() {
        return [
            {
                value: true,
                name: 'True'
            },
            {
                value: false,
                name: 'False'
            }
        ];
    }
}