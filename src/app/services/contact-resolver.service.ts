import { ContactService } from './contact.service';
import { CategoryService } from './category.service';
import { Documentary } from '../models/documentary.model';
import { DocumentaryService } from './documentary.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactResolverService implements Resolve<Observable<any>> {
  constructor(private contactService: ContactService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = route.params['id'];
    let contact = this.contactService.getContactById(id);
    console.log("contact");
    console.log(contact);
    return contact;
  }
}
