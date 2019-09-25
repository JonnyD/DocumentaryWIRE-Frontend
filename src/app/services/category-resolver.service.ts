import { CategoryService } from './category.service';
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
export class CategoryResolverService implements Resolve<Observable<any>> {
  constructor(private categoryService: CategoryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let slug = route.params['slug'];
    let category = this.categoryService.getCategoryBySlug(slug);
    console.log(category);
    return category;
  }
}
