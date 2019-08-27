import { CommnentService } from 'src/app/services/comment.service';
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
export class CommentResolverService implements Resolve<Observable<any>> {
  constructor(private commentService: CommnentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = route.params['id'];
    let comment = this.commentService.getCommentById(id);
    return comment;
  }
}
