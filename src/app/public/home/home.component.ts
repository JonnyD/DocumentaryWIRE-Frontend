import { SEOService } from './../../services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { DurationService } from './../../services/duration.service';
import { CategoryService } from './../../services/category.service';
import { YearService } from './../../services/year.service';
import { ActivityService } from './../../services/activity.service';
import { UserService } from './../../services/user.service';
import { DocumentaryService } from './../../services/documentary.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {PopoverModule} from 'ngx-smart-popover';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public recentlyUpdated;
  public newDocumentaries;
  public popularDocumentaries;
  public newestUsers;
  public activeUsers;
  public trending;
  public featured;

  private recentlyUpdatedSubscription;
  private newDocumentariesSubscription;
  private popularDocumentariesSubscription;
  private trendingSubscription;
  private featuredSubscription;

  isFetchingFeaturedDocumentaries = false;
  isFetchingRecentlyUpdatedDocumentaries = false;
  isFetchingNewDocumentaries = false;
  isFetchingPopularDocumentaries = false;
  isFetchingTrendingDocumentaries = false;

  trendingOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoWidth: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true,
    margin: 10,
    navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
  };

  recentlyUpdatedOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoWidth: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true,
    margin: 10,
    navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
  };

  newOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoWidth: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true,
    margin: 10,
    navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
  };

  popularOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoWidth: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true,
    margin: 10,
    navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
  };

  constructor(
    private documentaryService: DocumentaryService,
    private sanitizer: DomSanitizer,
    private seoService: SEOService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fetchFeaturedDocumentary();
    this.fetchTrendingDocumentaries();
    this.fetchRecentlyUpdatedDocumentaries();
    this.fetchNewDocumentaries();
    this.fetchPopularDocumentaries();

    this.seoService.setPageTitle('Watch Documentaires Online | DocumentaryWIRE');
  }

  fetchFeaturedDocumentary() {
    this.isFetchingFeaturedDocumentaries = true;
    let params = new HttpParams();

    this.featuredSubscription = this.documentaryService.getFeaturedDocumentary(params)
      .subscribe(result => {
        this.featured = result['items'];
        console.log('featured');
        console.log(this.featured);
        this.isFetchingFeaturedDocumentaries = false;
      })
  }

  fetchTrendingDocumentaries() {
    this.isFetchingTrendingDocumentaries = true;
    let params = new HttpParams();

    this.trendingSubscription = this.documentaryService.getTrendingDocumentaries(params)
      .subscribe(result => {
        this.trending = result['items'];
        console.log(result);

        this.isFetchingTrendingDocumentaries = false;
      });
  }

  fetchRecentlyUpdatedDocumentaries() {
    this.isFetchingRecentlyUpdatedDocumentaries = true;

    let params = new HttpParams();

    this.recentlyUpdatedSubscription = this.documentaryService.getRecentlyUpdatedDocumentaries(params)
      .subscribe(result => {
        this.recentlyUpdated = result['items'];

        this.isFetchingRecentlyUpdatedDocumentaries = false;
      });
  }

  fetchNewDocumentaries() {
    this.isFetchingNewDocumentaries = true;

    let params = new HttpParams();

    this.newDocumentariesSubscription = this.documentaryService.getNewDocumentaries(params)
      .subscribe(result => {
        this.newDocumentaries = result['items'];

        this.isFetchingNewDocumentaries = false;
      });
  }

  fetchPopularDocumentaries() {
    this.isFetchingPopularDocumentaries = true;

    let params = new HttpParams();

    this.popularDocumentariesSubscription = this.documentaryService.getPopularDocumentaries(params)
      .subscribe(result => {
        this.popularDocumentaries = result['items'];

        this.isFetchingPopularDocumentaries = false;
      });
  }

  ngOnDestroy() {
    this.trendingSubscription.unsubscribe();
    this.recentlyUpdatedSubscription.unsubscribe();
    this.newDocumentariesSubscription.unsubscribe();
    this.popularDocumentariesSubscription.unsubscribe();
    if (this.featuredSubscription != null) {
      this.featuredSubscription.unsubscribe();
    }
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
