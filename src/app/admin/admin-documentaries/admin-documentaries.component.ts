import { VideoSourceService } from './../../services/video-source.service';
import { VideoSource } from './../../models/video-source.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentaryService } from './../../services/documentary.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Documentary } from './../../models/documentary.model';
import { Location } from "@angular/common";

@Component({
  selector: 'app-admin-documentaries',
  templateUrl: './admin-documentaries.component.html',
  styleUrls: ['./admin-documentaries.component.css']
})
export class AdminDocumentariesComponent implements OnInit, OnDestroy {
  
  private documentariesSubscription;
  private queryParamsSubscription;
  private videoSourcesSubscription;
  public documentaries: Array<Documentary>;
  public videoSources: Array<VideoSource>;
  config: any;
  private page;
  private videoSource;
  private previousVideoSource;

  constructor(
    private service: DocumentaryService,
    private videoSourceService: VideoSourceService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;
        this.videoSource = +params['videoSource'] || null;
        this.fetchVideoSources();
        this.fetchDocumentaries();
      })
  }

  fetchDocumentaries() {
    let params = new HttpParams();
    if (this.videoSource) {
      params = params.append('videoSource', this.videoSource.toString());
      if (this.videoSource != this.previousVideoSource) {
        this.page = 1;
      }
      this.previousVideoSource = this.videoSource;
    }
    params = params.append('page', this.page.toString());
    
    this.location.go(this.router.url.split("?")[0], params.toString());

    this.documentariesSubscription = this.service.getAllDocumentaries(params)
      .subscribe(
          result => {
            this.config = {
              itemsPerPage: 12,
              currentPage: this.page,
              totalItems: result['count_results']
            };
            this.documentaries = result['items'];
            console.log(result);
          }
      );
  }

  fetchVideoSources() {
    this.videoSourcesSubscription = this.videoSourceService.getAllVideoSources()
      .subscribe(result => {
        this.videoSources = <any> result;
      });
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchDocumentaries();
  }

  onVideoSourceSelected(value: string) {
    this.videoSource = value;
    this.fetchDocumentaries();
  }

  ngOnDestroy() {
    this.documentariesSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
    this.videoSourcesSubscription.unsubscribe();
  }
}
