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
export class VideoSourceResolverService implements Resolve<Observable<any>> {
  constructor(
    private videoSourceService: VideoSourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = route.params['id'];
    let videoSource = this.videoSourceService.getVideoSourceById(id);
    return videoSource;
  }
}
