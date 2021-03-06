import { AuthenticationService } from './authentication.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DataService {

  private authenticationService: AuthenticationService;

  constructor(http: HttpClient, authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/category`, http);
    this.authenticationService = authenticationService;
  }

  getStatuses() {
    return ["enabled", "disabled"];
  }
  
  getCategoryById(id: number) {
    let options = {};

    return this.get(id, options);
  }

  getCategoryBySlug(slug: string) {
    let options = {};

    return this.get(slug, options);
  }

  getAllCategories(params: HttpParams, authenticate: boolean = false, isAdmin: boolean = false) {
    if (!isAdmin) {
      params = params.append('sort', 'name-asc');
      params = params.append('status', 'enabled');
    }

    if (authenticate) {
      if (this.authenticationService.isAuthenticated()) {
        let accessToken = this.authenticationService.currentTokenValue.access_token;
        params = params.append('access_token', accessToken)
      }
    }

    let options = {
      params: params
    }

    return this.getAll(options);
  }

  editCategory(id, resource) {
    let params = new HttpParams();

    if (this.authenticationService.isAuthenticated()) {
      let accessToken = this.authenticationService.currentTokenValue.access_token;
      params = params.append('access_token', accessToken)
    }

    let options = {
      params: params
    }

    return this.patch(id, resource, options);
  }

  getColumnsForCategories(categories) {
    let categoriesCount = 0;
    for (var key in categories) {
      categoriesCount++;
    }

    let half = Math.floor(categoriesCount / 2);
    let remainder = categoriesCount % half;

    let categoriesLeftColumnLength = half + remainder;
    let categoriesRightColumnLength = half;

    let categoriesLeftColumn = new Set();
    for (let i = 0; i < categoriesLeftColumnLength; i++) {
      categoriesLeftColumn.add(categories[i]);
    }

    let categoriesRighttColumn = new Set();
    for (let i = categoriesLeftColumnLength; i < (categoriesLeftColumnLength + categoriesRightColumnLength); i++) {
      categoriesRighttColumn.add(categories[i]);
    }

    let categoriesColumns = new Map();
    categoriesColumns.set('left', categoriesLeftColumn);
    categoriesColumns.set('right', categoriesRighttColumn);

    return categoriesColumns;
  }
}
