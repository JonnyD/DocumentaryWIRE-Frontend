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

  public user;
  public activity;
  public documentaries;
  public watchlists;

  config: any;
  private page;

  public isFetchingUser = true;
  public isFetchingActivity = true;
  public isFetchingDocumentaries = true;
  public isFetchingWatchlisted = true;

  private activitySubscription;
  private queryParamsSubscription;
  private documentarySubscription;
  private watchlistSubscription;

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
            this.fetchActivity();
            this.fetchDocumentaries();
            this.fetchWatchlists();
      });
    });
  }

  fetchActivity() {
    this.isFetchingActivity = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());
    params = params.append('user', this.user.username);

    this.activitySubscription = this.activityService.getAllActivities(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 6,
          currentPage: this.page,
          totalItems: result['count_results']
        };

        this.activity = result['items'];

        this.isFetchingActivity = false;
      })
  }

  fetchDocumentaries() {
    this.isFetchingDocumentaries = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());

    let pageSize = 5;
    params = params.append('amountPerPage', pageSize.toString());
    params = params.append('addedBy', this.user.username);

    this.documentarySubscription = this.documentaryService.getAllDocumentaries(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: pageSize,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.documentaries = result['items'];

        console.log(this.documentaries);
        
        this.isFetchingDocumentaries = false;
      })
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
        this.config = {
          itemsPerPage: pageSize,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.watchlists = result['items'];
        
        this.isFetchingWatchlisted = false;
      })
  }

  ngOnDestroy() {
    this.documentarySubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
    this.activitySubscription.unsubscribe();
    this.watchlistSubscription.unsubscribe();
  }
  
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
