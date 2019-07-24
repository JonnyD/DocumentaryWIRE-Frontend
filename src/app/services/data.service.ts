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
    return this.http.get(this.url + '/' + idOrSlug + "?access_token=OWVhODZiMWMyZDVmOGViYzY0NWZmMWMyODM4OWMwNDI3Mjc1ZmYxZTRmZmQ2ZjM2ZDFjN2M3MDZlNWFkY2M1ZQ");
  }

  getAll(params:HttpParams) {
    return this.http.get<Object[]>(this.url + "?access_token=OWVhODZiMWMyZDVmOGViYzY0NWZmMWMyODM4OWMwNDI3Mjc1ZmYxZTRmZmQ2ZjM2ZDFjN2M3MDZlNWFkY2M1ZQ", 
    {
      params: params
    });
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource));
  }

  update(resource) {
    return this.http.put(this.url + '/' + resource.id + "?access_token=OWVhODZiMWMyZDVmOGViYzY0NWZmMWMyODM4OWMwNDI3Mjc1ZmYxZTRmZmQ2ZjM2ZDFjN2M3MDZlNWFkY2M1ZQ", JSON.stringify({
      
    }));
  }

  patch(resource) {
    console.log(resource);
    return this.http.patch(this.url + '/' + resource.id + "?access_token=OWVhODZiMWMyZDVmOGViYzY0NWZmMWMyODM4OWMwNDI3Mjc1ZmYxZTRmZmQ2ZjM2ZDFjN2M3MDZlNWFkY2M1ZQ", JSON.stringify({
      resource
    }));
  }

  patchBySlug(resource) {
    console.log(resource);
    return this.http.patch(this.url + '/' + resource.slug + "?access_token=OWVhODZiMWMyZDVmOGViYzY0NWZmMWMyODM4OWMwNDI3Mjc1ZmYxZTRmZmQ2ZjM2ZDFjN2M3MDZlNWFkY2M1ZQ", JSON.stringify({
      resource
    }));
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
