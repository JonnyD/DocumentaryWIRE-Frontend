import { AuthenticationService } from './authentication.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
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

   getCategoryById(id: number) {
     return this.get(id);
   }
}
