import { Documentary } from './../models/documentary.model';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentaryService extends DataService {
  authenticationService: AuthenticationService;

  constructor(http: HttpClient, authenticationService: AuthenticationService) {
    let url = `${environment.apiUrl}/api/v1/documentary`;
    super(url, http);
    this.authenticationService = authenticationService;
   }

   getDocumentaryBySlug(slug: string) {
     return super.get(slug);
   }

   getAllDocumentaries(params: HttpParams) {
    return super.getAll(params);
   }

   createDocumentary(documentary: Documentary) {
     let currentTokenValue = this.authenticationService.currentTokenValue;
     let accessToken = currentTokenValue.access_token;
     if (accessToken) {
      let httpParams: HttpParams;
      httpParams.set('access_token', accessToken);
      return super.create(documentary, httpParams);
     }
   }

   updateDocumentary(documentary: Documentary) {
    let currentTokenValue = this.authenticationService.currentTokenValue;
    let accessToken = currentTokenValue.access_token;
    if (accessToken) {
     let httpParams: HttpParams;
     httpParams.set('access_token', accessToken);
     return super.update(documentary, httpParams);
    }
   }
}
