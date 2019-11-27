import { Documentary } from './../models/documentary.model';
import { DocumentaryService } from './documentary.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentaryResolverService implements Resolve<Observable<any>> {
  constructor(private documentaryService: DocumentaryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route.params);
    let slug = route.params['slug'];
    let documentary = this.documentaryService.getDocumentaryBySlug(slug);
    console.log("documentary");
    console.log(documentary);
    return documentary;
  }
}
