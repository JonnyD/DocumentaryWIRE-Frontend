import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private url: string, 
    private http: HttpClient) { }

  get(idOrSlug) {
    let url = this.url + '/' + idOrSlug;
    return this.http.get(url);
  }

  getAll(params:HttpParams) {
    return this.http.get<Object[]>(this.url, 
    {
      params: params
    });
  }

  create(resource, params: HttpParams) {
    return this.http.post(this.url, JSON.stringify(resource), {params});
  }

  update(resource, params: HttpParams) {
    return this.http.put(this.url + '/' + resource.id, JSON.stringify({
      resource
    }), {params});
  }

  patch(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({
      resource
    }));
  }

  patchBySlug(resource) {
    console.log(resource);
    return this.http.patch(this.url + '/' + resource.slug, JSON.stringify({
      resource
    }));
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
