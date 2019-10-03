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
export class DocumentaryService extends DataService {
  private authenticationService: AuthenticationService;

  constructor(
    http: HttpClient,
    authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/documentary`, http);
    this.authenticationService = authenticationService;
   }

   getDocumentaryBySlug(slug: string) {
    let options = {};

    if (this.authenticationService.isAuthenticated()) {
        let accessToken = this.authenticationService.currentTokenValue.access_token;
        options = {
          params: new HttpParams()
            .append('access_token', accessToken)
        }
    }

     return this.get(slug, options);
   }

   getAllDocumentaries(params: HttpParams) {
      if (this.authenticationService.isAuthenticated()) {
          let accessToken = this.authenticationService.currentTokenValue.access_token;
          params = params.append('access_token', accessToken)
      }

      let options = {
        params: params
      }

      return this.getAll(options);
   }

   getRecentlyUpdatedDocumentaries(params: HttpParams) {
     params = params.append('sort', 'updatedAt-desc');

    if (this.authenticationService.isAuthenticated()) {
        let accessToken = this.authenticationService.currentTokenValue.access_token;
        params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }
    
    return this.getAll(options);
   }

   getRecentlyAddedDocumentaries(params: HttpParams) {
    params = params.append('sort', 'createdAt-desc');

   if (this.authenticationService.isAuthenticated()) {
       let accessToken = this.authenticationService.currentTokenValue.access_token;
       params = params.append('access_token', accessToken)
   }

   let options = {
     params: params
   }
   
   return this.getAll(options);
  }

  getNewDocumentaries(params: HttpParams) {
   params = params.append('sort', 'year-desc');

  if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
  }

  let options = {
    params: params
  }
  
  return this.getAll(options);
 }

   createDocumentary(documentary: Documentary) {
      let options = {};

      if (this.authenticationService.isAuthenticated()) {
          let accessToken = this.authenticationService.currentTokenValue.access_token;
          options = {
            params: new HttpParams()
              .append('access_token', accessToken)
          }
      }

      return this.create(documentary, options);
   }

   editDocumentary(id, documentary: Documentary) {
    let options;

    if (this.authenticationService.isAuthenticated()) {
        let accessToken = this.authenticationService.currentTokenValue.access_token;
        options = {
          params: new HttpParams()
            .append('access_token', accessToken)
        }
    }
    
     return this.patch(id, documentary, options);
   }

   convertArrayOfDocumentariesToMap(documentaries, amountPerRow, amountTotal) {
    let cardDecks = new Map();

    let counter = 0;
    for (let i in documentaries) {
        if (+i === amountTotal) {
          break;
        }

        let documentary = documentaries[i];

        let cardDeck = cardDecks.get(counter);

        if (cardDeck === undefined || !cardDeck) {
          cardDeck = new Set();
        } 

        cardDeck.add(documentary);
        cardDecks.set(counter, cardDeck);

        if (+i != 0 && (+i + 1) % amountPerRow === 0) {
          counter++;
        }
    }

    return cardDecks;
   }
}
