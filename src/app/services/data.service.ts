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

  setUrl(url: string) {
    this.url = url;
  }

  get(idOrSlug, options, url?) {
    if (!url) {
      url = this.url + '/' + idOrSlug;
    } else {
      let url = this.url;
    }
    console.log("url");
    console.log(url);
    return this.http.get(url, options);
  }

  getAll(options) {
    return this.http.get<Object[]>(this.url, options);
  }

  create(resource, options, url?) {
    if (!url) {
      url = this.url;
    }
    console.log("url datas");
    console.log(url);
    return this.http.post(url, JSON.stringify(resource), options);
  }

  update(resource, options, url?) {
    if (!url) {
      url = this.url;
    }
    console.log("resource put");
    console.log(resource);
    console.log("this url");
    console.log(url + '/' + resource.id);
    console.log("options");
    console.log(options);
    return this.http.put(url + '/' + resource.id, JSON.stringify(
      resource
    ), options);
  }

  patch(id, resource, options, url?) {
    if (!url) {
      url = this.url;
    }
    console.log("resource patch");
    console.log(resource);
    return this.http.patch(url + '/' + Number(id), JSON.stringify(
      resource
    ), options);
  }

  patchBySlug(resource) {
    console.log(resource);
    return this.http.patch(this.url + '/' + resource.slug, JSON.stringify(
      resource
    ));
  }

  delete(id: number, options) {
    console.log("delete " + id);
    return this.http.delete(this.url + '/' + id, options);
  }

  post(urlSlug, resource, options) {
    let url = this.url + urlSlug;
    console.log("resource");
    console.log(url);
    console.log("resource");
    console.log(resource);
    console.log("stringify");
    console.log(JSON.stringify(resource));
    return this.http.post(url, JSON.stringify(
      resource
    ), options);
  }
}
