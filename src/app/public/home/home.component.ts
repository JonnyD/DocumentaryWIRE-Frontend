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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  

  public recentlyAdded;
  public recentlyUpdated;
  public newDocumentaries;
  public popularDocumentaries;
  public newestUsers;
  public activeUsers;
  public activity;
  public years;
  public categories;
  public duration;

  private recentlyAddedSubscription;
  private recentlyUpdatedSubscription;
  private newDocumentariesSubscription;
  private popularDocumentariesSubscription;
  private newestUsersSubscription;
  private activeUsersSubscription;
  private activitySubscription;
  private yearsSubscription;
  private categoriesSubscription;

  isFetchingRecentlyAddedDocumentaries = false;
  isFetchingRecentlyUpdatedDocumentaries = false;
  isFetchingNewDocumentaries = false;
  isFetchingPopularDocumentaries = false;
  isFetchingNewestUsers = false;
  isFetchingActiveUsers = false;
  isFetchingCategories = false;
  isFetchingYears = false;
  isFetchingDuration = false;
  isFetchingActivity = false;

  recentlyAddedOptions: OwlOptions = {
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
    navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
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
    navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
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
    navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
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
    navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
  };

  constructor(
    private documentaryService: DocumentaryService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private activityService: ActivityService,
    private yearService: YearService,
    private categoryService: CategoryService,
    private durationService: DurationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
      this.fetchRecentlyAddedDocumentaries();
      this.fetchRecentlyUpdatedDocumentaries();
      this.fetchNewDocumentaries();
      this.fetchPopularDocumentaries();
      this.fetchNewestUsers();
      this.fetchActiveUsers();
      this.fetchCategories();
      this.fetchYears();
      this.fetchDuration();
      this.fetchActivity();
  }

  fetchRecentlyAddedDocumentaries() {
    this.isFetchingRecentlyAddedDocumentaries = true;
    let params = new HttpParams();

    this.recentlyAddedSubscription = this.documentaryService.getRecentlyAddedDocumentaries(params)
      .subscribe(result => {
        this.recentlyAdded = result['items'];
        console.log(result);

        this.isFetchingRecentlyAddedDocumentaries = false;
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

  fetchNewestUsers() {
    this.isFetchingNewestUsers = true;

    let params = new HttpParams();

    this.newestUsersSubscription = this.userService.getNewestUsers(params)
      .subscribe(result => {
        this.newestUsers = result['items'];

        this.isFetchingNewestUsers = false;
      });
  }

  fetchActiveUsers() {
    this.isFetchingActiveUsers = true;

    let params = new HttpParams();

    this.activeUsersSubscription = this.userService.getActiveUsers(params)
      .subscribe(result => {
        this.activeUsers = result['items'];

        this.isFetchingActiveUsers = false;
      });
  }

  fetchActivity() {
    this.isFetchingActivity = true;

    this.activitySubscription = this.activityService.getActivityForRecentWidget(new HttpParams)
      .subscribe(result => {
        console.log(result);
        let arr = [];
        for (var key in result) {
          arr.push(result[key])
        }

        this.activity = arr.reverse();

        console.log("act");
        console.log(result);

        this.isFetchingActivity = false;
      });
  }

  fetchCategories() {
    this.isFetchingCategories = true;

    this.categoriesSubscription = this.categoryService.getAllCategories()
      .subscribe(result => {
        this.categories = this.categoryService.getColumnsForCategories(result);

        this.isFetchingCategories = false;
      })
  }

  fetchDuration() {
    this.isFetchingDuration = true;

    let duration = this.durationService.getAllDurations();
    this.duration = this.durationService.getColumnsForDuration(duration);

    this.isFetchingDuration = false;
  }

  fetchYears() {
    this.isFetchingYears = true;

    this.yearsSubscription = this.yearService.getAllYears()
      .subscribe(result => {
        console.log("years result");
        console.log(result);
        this.years = this.yearService.getColumnsForYears(result);

        this.isFetchingYears = false;
      })
  }

  ngOnDestroy() {
    this.recentlyAddedSubscription.unsubscribe();
    this.recentlyUpdatedSubscription.unsubscribe();
    this.newDocumentariesSubscription.unsubscribe();
    this.popularDocumentariesSubscription.unsubscribe();
    this.newestUsersSubscription.unsubscribe();
    this.activeUsersSubscription.unsubscribe();
    this.activitySubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
    this.yearsSubscription.unsubscribe();
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
