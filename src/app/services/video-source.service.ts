import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoSourceService extends DataService {

  private authenticationService: AuthenticationService;

  constructor(http: HttpClient, authenticationService: AuthenticationService) {
    super(`${environment.apiUrl}/api/v1/video-source`, http);
    this.authenticationService = authenticationService;
   }

   getVideoSourceById(id: number) {
     return this.get(id);
   }
}
