import { Contact } from './../models/contact.model';
import { AuthenticationService } from './authentication.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ContactService extends DataService {

    private authenticationService: AuthenticationService;

    constructor(http: HttpClient, authenticationService: AuthenticationService) {
        super(`${environment.apiUrl}/api/v1/contact`, http);
        this.authenticationService = authenticationService;
    }

    getContactById(id: number) {
        let options = {};

        return this.get(id, options);
    }

    getAllContacts(params: HttpParams) {
        if (this.authenticationService.isAuthenticated()) {
            let accessToken = this.authenticationService.currentTokenValue.access_token;
            params = params.append('access_token', accessToken)
        }

        let options = {
            params: params
        }

        return this.getAll(options);
    }

    createContact(contact: Contact) {
        let options = {};
  
        return this.create(contact, options);
    }
}
