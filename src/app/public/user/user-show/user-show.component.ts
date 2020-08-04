import { WatchlistService } from './../../../services/watchlist.service';
import { DocumentaryService } from './../../../services/documentary.service';
import { HttpParams } from '@angular/common/http';
import { ActivityService } from './../../../services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css']
})
export class UserShowComponent implements OnInit {

  private user;
  private me;
  private activity;
  private documentaries;
  private watchlists;

  private config: any;
  private page;

  private isFetchingUser = true;
  private isFetchingActivity = true;
  private isFetchingDocumentaries = true;
  private isFetchingWatchlisted = true;
  private isFetchingMe = true;

  private activitySubscription;
  private queryParamsSubscription;
  private documentarySubscription;
  private watchlistSubscription;
  private meSubscription;

  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private documentaryService: DocumentaryService,
    private watchlistService: WatchlistService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isFetchingUser = true;

    this.route.data.subscribe(result => {
      this.user = result[0];

      this.isFetchingUser = false;

      this.queryParamsSubscription = this.route
        .queryParams
        .subscribe(params => {
          this.page = +params['page'] || 1;

          this.fetchMe();
          this.fetchActivity();
          //this.fetchDocumentaries();
          //this.fetchWatchlists();
        });
    });
  }

  fetchMe() {
    this.isFetchingMe = true;

    this.meSubscription = this.userService.getMe()
      .subscribe(result => {
        console.log(result);
        this.me = result;

        this.isFetchingMe = false;
      }, error => {
        console.log("error");
        console.log(error);

        this.isFetchingMe = false;
      })
  }

  fetchActivity() {
    this.isFetchingActivity = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());
    this.location.go(this.router.url.split("?")[0], params.toString());
    params = params.append('user', this.user.username);

    let itemsPerPage = 12;

    this.activitySubscription = this.activityService.getAllActivities(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: itemsPerPage,
          currentPage: this.page,
          totalItems: result['count_results']
        };

        this.activity = result['items'];

        this.isFetchingActivity = false;
      })
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchActivity();
  }

  fetchWatchlists() {
    this.isFetchingWatchlisted = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());

    let pageSize = 5;
    params = params.append('amountPerPage', pageSize.toString());
    params = params.append('user', this.user.username);

    this.watchlistSubscription = this.watchlistService.getAllWatchlists(params)
      .subscribe(result => {
        console.log("watchlist result");
        console.log(result);
        this.config = {
          itemsPerPage: pageSize,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.watchlists = result['items'];

        this.isFetchingWatchlisted = false;
      }, error => {
        console.log("watchlist error");
        console.log(error);
      });
  }

  ngOnDestroy() {
    if (this.documentarySubscription != null) {
      this.documentarySubscription.unsubscribe();
    }
    this.queryParamsSubscription.unsubscribe();
    if (this.activitySubscription != null) {
      this.activitySubscription.unsubscribe();
    }
    if (this.watchlistSubscription != null) {
      this.watchlistSubscription.unsubscribe();
    }
    this.meSubscription.unsubscribe();
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
