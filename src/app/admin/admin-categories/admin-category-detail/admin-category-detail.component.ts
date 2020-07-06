import { Status } from './../../../models/status.model';
import { Type } from './../../../models/type.model';
import { VideoSourceService } from './../../../services/video-source.service';
import { DocumentaryService } from './../../../services/documentary.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Documentary } from 'src/app/models/documentary.model';
import { Location } from "@angular/common";
import { VideoSource } from 'src/app/models/video-source.model';

@Component({
  selector: 'app-admin-category-detail',
  templateUrl: './admin-category-detail.component.html',
  styleUrls: ['./admin-category-detail.component.css']
})
export class AdminCategoryDetailComponent implements OnInit {
  private queryParamsSubscription;
  private videoSourcesSubscription;

  private category: Category;

  private videoSources: Array<VideoSource>;
  private documentaries: Array<Documentary>;

  private documentaryPage;
  private documentaryType;
  private previousDocumentaryType;
  private documentaryVideoSource;
  private previousDocumentaryVideoSource;
  private documentaryStatus;
  private previousDocumentaryStatus;
  private documentaryFeatured;
  private previousDocumentaryFeatured;

  private config;
  
  private types: Array<Type> = [
    { id: 'movie', name: 'Movie' },
    { id: 'series', name: 'Series' }
  ];

  private statuses: Array<Status> = [
    { id: 'pending', name: 'Pending' },
    { id: 'publish', name: 'Published' },
    { id: 'rejected', name: 'Rejected' }
  ];

  private featuredOptions = [
    { id: "yes" },
    { id: "no" }
  ];

  constructor(
    private documentaryService: DocumentaryService,
    private videoSourceService: VideoSourceService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.category = <Category>result[0];

      this.queryParamsSubscription = this.route
        .queryParams
        .subscribe(params => {
          this.documentaryPage = +params['documentaryPage'] || 1;
          this.documentaryVideoSource = +params['documentaryVideoSource'] || 'all';
          this.documentaryType = params['documentaryType'] || 'all';
          this.documentaryStatus = params['documentaryStatus'] || 'all';
          this.documentaryFeatured = params['documentaryFeatured'] || 'all';

          this.fetchVideoSources();
          this.fetchDocumentaries();
        });
    })
  }

  fetchVideoSources() {
    this.videoSourcesSubscription = this.videoSourceService.getAllVideoSources()
      .subscribe(result => {
        this.videoSources = <any>result;
      });
  }

  fetchDocumentaries() {
    let params = new HttpParams;

    if (this.documentaryVideoSource) {
      if (this.documentaryVideoSource != 'all') {
        params = params.append('documentaryVideoSource', this.documentaryVideoSource);
        if (this.documentaryVideoSource != this.previousDocumentaryVideoSource) {
          this.documentaryPage = 1;
        }
      }
      this.previousDocumentaryVideoSource = this.documentaryVideoSource;
    }

    if (this.documentaryType) {
      if (this.documentaryType != 'all') {
        params = params.append('documentaryType', this.documentaryType);
        if (this.documentaryType != this.previousDocumentaryType) {
          this.documentaryPage = 1;
        }
      }
      this.previousDocumentaryType = this.previousDocumentaryType;
    }

    if (this.documentaryStatus) {
      if (this.documentaryStatus != 'all') {
        params = params.append('documentaryStatus', this.documentaryStatus);
        if (this.documentaryStatus != this.previousDocumentaryStatus) {
          this.documentaryPage = 1;
        }
      }
      this.previousDocumentaryStatus = this.documentaryStatus;
    }

    if (this.documentaryFeatured) {
      if (this.documentaryFeatured != 'all') {
        params = params.append('documentaryFeatured', this.documentaryFeatured);
        if (this.documentaryFeatured != this.previousDocumentaryFeatured) {
          this.documentaryPage = 1;
        }
      }
      this.previousDocumentaryFeatured = this.documentaryFeatured;
    }
    
    params = params.append('documentaryPage', this.documentaryPage.toString());

    this.updateUrl(params);

    params = params.append('category', this.category.slug);

    this.documentaryService.getAllDocumentaries(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 12,
          currentPage: this.documentaryPage,
          totalItems: result['count_results']
        };
        this.documentaries = result['items'];
      })
  }

  updateUrl(params: HttpParams) {
    this.location.go(this.router.url.split("?")[0], params.toString());
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.documentaryPage = event;
    this.fetchDocumentaries();
  }

  onVideoSourceSelected(value: string) {
    this.documentaryVideoSource = value;
    this.fetchDocumentaries();
  }

  onStatusSelected(value: string) {
    this.documentaryStatus = value;
    this.fetchDocumentaries();
  }

  onTypeSelected(value: string) {
    this.documentaryType = value;
    this.fetchDocumentaries();
  }

  onFeaturedSelected(value: string) {
    this.documentaryFeatured = value;
    this.fetchDocumentaries();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.videoSourcesSubscription.unsubscribe();
  }
}
