import { Type } from './../models/type.model';
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

  getStatuses() {
    return [
      { id: 'pending', name: 'Pending' },
      { id: 'publish', name: 'Published' },
      { id: 'rejected', name: 'Rejected' }
    ];
  }

  getFeaturedOptions() {
    return [
      { id: "yes" },
      { id: "no" }
    ];
  }

  getTypes() {
    return [
      { id: 'movie', name: 'Movie' },
      { id: 'series', name: 'Series' }
    ];
  }

  getDocumentaryBySlug(slug: string) {
    let options = {};

    return this.get(slug, options);
  }

  getAllDocumentaries(params: HttpParams) {
    if (params.has('documentaryPage')) {
      params = params.append('page', params.get('documentaryPage'));
      params = params.delete('documentaryPage');
    }
    if (params.has('documentaryVideoSource')) {
      params = params.append('videoSource', params.get('documentaryVideoSource'));
      params = params.delete('documentaryVideoSource');
    }
    if (params.has('documentaryStatus')) {
      params = params.append('status', params.get('documentaryStatus'));
      params = params.delete('documentaryStatus');
    }
    if (params.has('documentaryFeatured')) {
      params = params.append('featured', params.get('documentaryFeatured'));
      params = params.delete('documentaryFeatured');
    }

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }

    return this.getAll(options);
  }

  getMyStandloneDocumentaries(params: HttpParams, username: string) {
    params = params.append('addedBy', username);
    params = params.append('type', 'movie');
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

  getMyEpisodicDocumentaries(params: HttpParams, username: string) {
    params = params.append('addedBy', username);
    params = params.append('type', 'series');
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

  getRecentlyUpdatedDocumentaries(params: HttpParams) {
    params = params.append('sort', 'updatedAt-desc');
    params = params.append('status', 'published');

    let options = {
      params: params
    }

    return this.getAll(options);
  }

  getPopularDocumentaries(params: HttpParams) {
    params = params.append('sort', 'views-desc');
    params = params.append('status', 'published');

    let options = {
      params: params
    }

    return this.getAll(options);
  }

  getRecentlyAddedDocumentaries(params: HttpParams) {
    params = params.append('sort', 'createdAt-desc');
    params = params.append('status', 'published');

    let options = {
      params: params
    }

    return this.getAll(options);
  }

  getNewDocumentaries(params: HttpParams) {
    params = params.append('sort', 'yearFrom-desc');
    params = params.append('sort', 'createdAt-desc');
    params = params.append('status', 'published');

    let options = {
      params: params
    }

    return this.getAll(options);
  }

  getTrendingDocumentaries(params: HttpParams) {
    params = params.append('sort', 'todayViews-desc');
    params = params.append('status', 'published');

    let options = {
      params: params
    }

    return this.getAll(options);
  }

  getFeaturedDocumentary(params: HttpParams) {
    params = params.append('status', 'published');
    params = params.append('featured', 'yes');

    let options = {
      params: params
    }

    return this.getAll(options);
  }

  createStandaloneDocumentary(resource) {
    let params = new HttpParams();

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }

    let url = `${environment.apiUrl}/api/v1/documentary/movie`;
    return this.create(resource, options, url);
  }

  editStandaloneDocumentary(id, documentary: Documentary) {
    let params = new HttpParams();

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken);
    }

    let options = {
      params: params
    }

    let url = `${environment.apiUrl}/api/v1/documentary/movie`;
    return this.patch(id, documentary, options, url);
  }

  createEpisodicDocumentary(resource) {
    let params = new HttpParams();

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }

    let url = `${environment.apiUrl}/api/v1/documentary/series`;
    return this.create(resource, options, url);
  }

  createEpisodeDocumentary(resource) {
    let params = new HttpParams();

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }

    let url = `${environment.apiUrl}/api/v1/documentary/episode`;
    return this.create(resource, options, url);
  }

  editEpisodeDocumentary(id, resource) {
    let params = new HttpParams();

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }

    let url = `${environment.apiUrl}/api/v1/documentary/episode`;
    return this.patch(id, resource, options, url);
  }

  editEpisodicDocumentary(id, documentary: Documentary) {
    let params = new HttpParams();

    params = params.append('type', 'series');

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken);
    }

    let options = {
      params: params
    }

    let url = `${environment.apiUrl}/api/v1/documentary/series`;
    return this.patch(id, documentary, options, url);
  }

  convertToSeries(documentary: Documentary) {
    let params = new HttpParams();

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken);
    }

    let options = {
      params: params
    }

    let url = `${environment.apiUrl}/api/v1/documentary/convert-to-series`;
    return this.update(documentary, options, url);
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
