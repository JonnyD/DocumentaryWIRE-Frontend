import { Documentary } from './../models/documentary.model';
import { DocumentaryService } from './documentary.service';
import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HomeResolverService implements Resolve<Observable<any>> {
    private recentlyAdded: any;

    constructor(private documentaryService: DocumentaryService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.documentaryService.getRecentlyAddedDocumentaries(new HttpParams()).subscribe(result => {
            this.recentlyAdded =result;
            console.log("recentlyAdded");
            console.log(this.recentlyAdded);
            return this.recentlyAdded;
        });
        return this.recentlyAdded;
    }
}
