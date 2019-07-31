import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url: string, private http: HttpClient) { }

  get(idOrSlug) {
    return this.http.get(this.url + '/' + idOrSlug + "?access_token=ZWJkNDkxZDU4ZGZlZTMxN2MwZTEyNGYxYzIwYjYxOWJhYmMyZjQxN2I5ZjdkNDVjYjJkNjVjYjQ0YWFmNTAzNQ");
  }

  getAll(params:HttpParams) {
    return this.http.get<Object[]>(this.url + "?access_token=ZWJkNDkxZDU4ZGZlZTMxN2MwZTEyNGYxYzIwYjYxOWJhYmMyZjQxN2I5ZjdkNDVjYjJkNjVjYjQ0YWFmNTAzNQ", 
    {
      params: params
    });
  }

  create(resource) {
    console.log("url: " + this.url);
    console.log(resource);
    return this.http.post(this.url  + "?access_token=ZWJkNDkxZDU4ZGZlZTMxN2MwZTEyNGYxYzIwYjYxOWJhYmMyZjQxN2I5ZjdkNDVjYjJkNjVjYjQ0YWFmNTAzNQ", JSON.stringify(resource));
  }

  update(resource) {
    return this.http.put(this.url + '/' + resource.id + "?access_token=ZWJkNDkxZDU4ZGZlZTMxN2MwZTEyNGYxYzIwYjYxOWJhYmMyZjQxN2I5ZjdkNDVjYjJkNjVjYjQ0YWFmNTAzNQ", JSON.stringify({
      
    }));
  }

  patch(resource) {
    console.log(resource);
    return this.http.patch(this.url + '/' + resource.id + "?access_token=ZWJkNDkxZDU4ZGZlZTMxN2MwZTEyNGYxYzIwYjYxOWJhYmMyZjQxN2I5ZjdkNDVjYjJkNjVjYjQ0YWFmNTAzNQ", JSON.stringify({
      resource
    }));
  }

  patchBySlug(resource) {
    console.log(resource);
    return this.http.patch(this.url + '/' + resource.slug + "?access_token=ZWJkNDkxZDU4ZGZlZTMxN2MwZTEyNGYxYzIwYjYxOWJhYmMyZjQxN2I5ZjdkNDVjYjJkNjVjYjQ0YWFmNTAzNQ", JSON.stringify({
      resource
    }));
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
