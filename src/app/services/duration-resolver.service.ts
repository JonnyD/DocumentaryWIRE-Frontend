import { DurationService } from './duration.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DurationResolverService implements Resolve<Observable<any>> {
  constructor(private durationService: DurationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let durationSlug = route.params['slug'];
    let duration = this.durationService.getDurationBySlug(durationSlug);
    return duration;
  }
}
