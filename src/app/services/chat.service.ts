import { AuthenticationService } from './authentication.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends DataService {

  private authenticationService: AuthenticationService;

  constructor(http: HttpClient, authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/chat`, http);
    this.authenticationService = authenticationService;
   }

   getChat() {
    let options = {};

    let url = `${environment.apiUrl}/api/v1/chat`;
     return this.get(options, url);
   }
}
