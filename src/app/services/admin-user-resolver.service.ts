import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AdminUserResolverService implements Resolve<Observable<any>> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = route.params['id'];
    let user = this.userService.getUserById(id);
    return user;
  }
}
