import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentaryService extends DataService {

  constructor(http: HttpClient) {
    super('http://165.22.34.83/api/v1/documentary', http);
   }
}
