import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get<Object[]>(this.url);
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource));
  }

  update(resource) {
    return this.http.put(this.url + '/' + resource.id, JSON.stringify({
      
    }));
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
