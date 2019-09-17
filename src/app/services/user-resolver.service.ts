import { CommnentService } from 'src/app/services/comment.service';
import { Documentary } from '../models/documentary.model';
import { DocumentaryService } from './documentary.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserResolverService implements Resolve<Observable<any>> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = route.params['id'];
    console.log(id);
    let user = this.userService.getUserById(id);
    console.log(user);
    return user;
  }
}
