import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthneticatedUserResolverService implements Resolve<Observable<any>> {
  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user = this.userService.getMe();
    return user;
  }
}
