import { ActivityService } from './activity.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActivityResolverService implements Resolve<Observable<any>> {
  constructor(private activityService: ActivityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = route.params['id'];
    console.log("id " + id);
    let activity = this.activityService.getActivityById(id);
    console.log(activity);
    return activity;
  }
}
