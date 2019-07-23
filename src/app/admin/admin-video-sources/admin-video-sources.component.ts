import { HttpParams } from '@angular/common/http';
import { VideoSourceService } from './../../services/video-source.service';
import { Component, OnInit } from '@angular/core';
import { VideoSource } from 'src/app/models/video-source.model';

@Component({
  selector: 'app-admin-video-sources',
  templateUrl: './admin-video-sources.component.html',
  styleUrls: ['./admin-video-sources.component.css']
})
export class AdminVideoSourcesComponent implements OnInit {
  videoSources: VideoSource[];

  constructor(
    private videoSourcesService: VideoSourceService) { }

  ngOnInit() {
    this.fetchVideoSources();
  }

  fetchVideoSources() {
    let params: HttpParams;

    this.videoSourcesService.getAll(params)
      .subscribe(result => {
        this.videoSources = <VideoSource[]> result;
      })
  }
}
