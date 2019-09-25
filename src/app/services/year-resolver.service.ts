import { YearService } from 'src/app/services/year.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class YearResolverService implements Resolve<Observable<any>> {
  constructor(private yearService: YearService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let year = route.params['id'];
    return year;
  }
}
