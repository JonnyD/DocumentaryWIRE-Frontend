import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url: string, private http: HttpClient) { }

  get(slug) {
    return this.http.get(this.url + '/' + slug + "?access_token=N2ZjNTA3NGM2MDE4NTQwMjc2NDYyZmQwNGFiOWJiNzAxYjNmZTBhY2FjNzExYWZkYjMwMGI0MDM4ZmMzNzkxMA");
  }

  getAll(params:HttpParams) {
    return this.http.get<Object[]>(this.url + "?access_token=N2ZjNTA3NGM2MDE4NTQwMjc2NDYyZmQwNGFiOWJiNzAxYjNmZTBhY2FjNzExYWZkYjMwMGI0MDM4ZmMzNzkxMA", 
    {
      params: params
    });
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
