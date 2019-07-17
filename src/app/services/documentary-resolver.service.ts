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
export class DocumentaryResolverService implements Resolve<Observable> {
  constructor(private documentaryService: DocumentaryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let slug = route.params['slug'];
    return this.documentaryService.get(slug);
  }
}
