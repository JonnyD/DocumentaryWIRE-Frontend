import { HeaderAccessTokenService } from './../helpers/header-access-token.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class YearService extends DataService {

  private authenticationService: AuthenticationService;

  constructor(http: HttpClient, authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/year`, http);
    this.authenticationService = authenticationService;
   }

   getColumnsForYears(years) {
      let yearsCount = 0;
      for (var key in years) {
        yearsCount++;
      }

      let half = Math.floor(yearsCount / 2);
      let remainder = yearsCount % half;

      let yearsLeftColumnLength = half + remainder;
      let yearsRightColumnLength = half;

      let yearsLeftColumn = new Set();
      for (let i = 0; i < yearsLeftColumnLength; i++) {
          yearsLeftColumn.add(years[i]);
      }

      let yearsRightColumn = new Set();
      for (let i = yearsLeftColumnLength; i < (yearsLeftColumnLength + yearsRightColumnLength); i++) {
          yearsRightColumn.add(years[i]);
      }

      let yearsColumns = new Map();
      yearsColumns.set('left', yearsLeftColumn);
      yearsColumns.set('right', yearsRightColumn);

      return yearsColumns;
   }

   getAllYears() {
    let options = {};

    if (this.authenticationService.isAuthenticated()) {
        let accessToken = this.authenticationService.currentTokenValue.access_token;
        options = {
          params: new HttpParams()
            .append('access_token', accessToken)
        }
    }
     return this.getAll(options);
    }

    getAllYearsForForm() {
      let currentYear = moment(new Date()).format('YYYY');

      let years = [];
      years.push(currentYear);

      let counter = 1;
      for (let i = +currentYear; i > 0; i--) {
        if (counter === 100) {
          break;
        }

        let year = i - 1;
        years.push(year);

        counter++;
      }

      return years;
    }
}
