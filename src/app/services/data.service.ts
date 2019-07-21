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
    return this.http.get(this.url + '/' + idOrSlug + "?access_token=YzNhNGY5ZTM4MGEzYWE5MGJiNDc2YWU5YjY3ZGE1OTdmYjIxZmViMDI5OGYxMGZjYTE1NjJhYmQwMTVlMGFjNA");
  }

  getAll(params:HttpParams) {
    return this.http.get<Object[]>(this.url + "?access_token=YzNhNGY5ZTM4MGEzYWE5MGJiNDc2YWU5YjY3ZGE1OTdmYjIxZmViMDI5OGYxMGZjYTE1NjJhYmQwMTVlMGFjNA", 
    {
      params: params
    });
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource));
  }

  update(resource) {
    return this.http.put(this.url + '/' + resource.id + "?access_token=YzNhNGY5ZTM4MGEzYWE5MGJiNDc2YWU5YjY3ZGE1OTdmYjIxZmViMDI5OGYxMGZjYTE1NjJhYmQwMTVlMGFjNA", JSON.stringify({
      
    }));
  }

  patch(resource) {
    console.log(resource);
    return this.http.patch(this.url + '/' + resource.slug + "?access_token=YzNhNGY5ZTM4MGEzYWE5MGJiNDc2YWU5YjY3ZGE1OTdmYjIxZmViMDI5OGYxMGZjYTE1NjJhYmQwMTVlMGFjNA", JSON.stringify({
      resource
    })).subscribe(result => {
      console.log(result);
    });
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
