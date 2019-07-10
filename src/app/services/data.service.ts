import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url: string, private http: HttpClient) { }

  get(resource) {
    console.log(resource);
    console.log(this.url + '/' + resource.slug + "?access_token=NTdlNTgxM2I2ZjYyODU4OWEyNDM5MmMwNGRlOTM3MTdlMjUyMjI4OTkyNTFhZWUyMjA5ZmQ1MTJlYzFkNjIwYQ");
    return this.http.get(this.url + '/' + resource.slug + "?access_token=NTdlNTgxM2I2ZjYyODU4OWEyNDM5MmMwNGRlOTM3MTdlMjUyMjI4OTkyNTFhZWUyMjA5ZmQ1MTJlYzFkNjIwYQ");
  }

  getAll(params:HttpParams) {
    return this.http.get<Object[]>(this.url + "?access_token=NTdlNTgxM2I2ZjYyODU4OWEyNDM5MmMwNGRlOTM3MTdlMjUyMjI4OTkyNTFhZWUyMjA5ZmQ1MTJlYzFkNjIwYQ", 
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
