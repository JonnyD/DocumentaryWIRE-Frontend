import { Type } from './../../models/type.model';
import { Status } from './../../models/status.model';
import { CategoryService } from './../../services/category.service';
import { VideoSourceService } from './../../services/video-source.service';
import { VideoSource } from './../../models/video-source.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentaryService } from './../../services/documentary.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Documentary } from './../../models/documentary.model';
import { Location } from "@angular/common";
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-admin-documentaries',
  templateUrl: './admin-documentaries.component.html',
  styleUrls: ['./admin-documentaries.component.css']
})
export class AdminDocumentariesComponent implements OnInit, OnDestroy {

  private documentariesSubscription;
  private queryParamsSubscription;
  private videoSourcesSubscription;
  private categoriesSubscription;

  private documentaries: Array<Documentary>;
  private videoSources: Array<VideoSource>;
  private categories: Array<Category>;

  private statuses;
  private featuredOptions;
  private types;

  private config: any;

  private page;
  private videoSource;
  private previousVideoSource;
  private previousCategory;
  private category;
  private status;
  private previousStatus;
  private featured;
  private previousFeatured;
  private type;
  private previousType;

  constructor(
    private documentaryService: DocumentaryService,
    private videoSourceService: VideoSourceService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {

    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.statuses = this.documentaryService.getStatuses();
        this.featuredOptions = this.documentaryService.getFeaturedOptions();
        this.types = this.documentaryService.getTypes();

        this.page = +params['page'] || 1;
        this.videoSource = +params['videoSource'] || 'all';
        this.status = params['status'] || 'all';
        this.featured = params['featured'] || 'all';
        this.type = params['type'] || 'all';
        this.category = +params['category'] || 'all';

        this.fetchVideoSources();
        this.fetchCategories();
        this.fetchDocumentaries();
      })
  }

  fetchDocumentaries() {
    let params = new HttpParams();
    if (this.videoSource) {
      if (this.videoSource != 'all') {
        params = params.append('videoSource', this.videoSource.toString());
        if (this.videoSource != this.previousVideoSource
          && this.previousVideoSource != null) {
          this.page = 1;
        }
      }
      this.previousVideoSource = this.videoSource;
    }
    if (this.category) {
      if (this.category != 'all') {
        params = params.append('category', this.category.toString());
        if (this.category != this.previousCategory
          && this.previousCategory != null) {
          this.page = 1;
        }
      }
      this.previousCategory = this.category;
    }
    if (this.status) {
      if (this.status != 'all') {
        params = params.append('status', this.status.toString());
        if (this.status != this.previousStatus
          && this.previousStatus != null) {
          this.page = 1;
        }
      }
      this.previousStatus = this.status;
    }
    if (this.featured) {
      if (this.featured != 'all') {
        params = params.append('featured', this.featured.toString());
        if (this.featured != this.previousFeatured
          && this.previousFeatured != null) {
          this.page = 1;
        }
      }
      this.previousFeatured = this.featured;
    }
    if (this.type) {
      if (this.type != 'all') {
        params = params.append('type', this.type.toString());
        if (this.type != this.previousType
          && this.previousType != null) {
          this.page = 1;
        }
      }
    }

    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());

    let authenticate = true;
    let isAdmin = true;
    this.documentariesSubscription = this.documentaryService.getAllDocumentaries(params)
      .subscribe(
        result => {
          this.config = {
            itemsPerPage: 20,
            currentPage: this.page,
            totalItems: result['count_results']
          };
          this.documentaries = result['items'];
          console.log("this.documentaries");
          console.log(this.documentaries);
        }
      );
  }

  fetchVideoSources() {
    this.videoSourcesSubscription = this.videoSourceService.getAllVideoSources()
      .subscribe(result => {
        this.videoSources = <any>result;
      });
  }

  fetchCategories() {
    let params = new HttpParams();
    let authenticate = true;
    let isAdmin = true;
    this.categoriesSubscription = this.categoryService.getAllCategories(params, authenticate, isAdmin)
      .subscribe(result => {
        this.categories = <any>result;
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

  onCategoriesSelected(value: string) {
    this.category = value;
    this.fetchDocumentaries();
  }

  onStatusSelected(value: string) {
    this.status = value;
    this.fetchDocumentaries();
  }

  onFeaturedSelected(value: string) {
    this.featured = value;
    this.fetchDocumentaries();
  }

  onTypeSelected(value: string) {
    this.type = value;
    this.fetchDocumentaries();
  }

  ngOnDestroy() {
    this.documentariesSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
    this.videoSourcesSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
  }
}
