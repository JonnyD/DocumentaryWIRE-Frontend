import { VideoSource } from './../../../models/video-source.model';
import { VideoSourceService } from './../../../services/video-source.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-video-source-detail',
  templateUrl: './admin-video-source-detail.component.html',
  styleUrls: ['./admin-video-source-detail.component.css']
})
export class AdminVideoSourceDetailComponent implements OnInit {

  videoSource: VideoSource;

  constructor(
    private route: ActivatedRoute,
    private videoSourceService: VideoSourceService,
    private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.videoSource = <VideoSource> result[0];
    })
  }
}
