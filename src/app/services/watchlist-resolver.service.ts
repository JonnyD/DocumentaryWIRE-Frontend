import { WatchlistService } from './watchlist.service';
import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { VideoSourceService } from './video-source.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WatchlistResolverService implements Resolve<Observable<any>> {
  constructor(
    private watchlistService: WatchlistService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = route.params['id'];
    let watchlist = this.watchlistService.getWatchlistById(id);
    return watchlist;
  }
}
