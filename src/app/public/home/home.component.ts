import { ActivityService } from './../../services/activity.service';
import { UserService } from './../../services/user.service';
import { DocumentaryService } from './../../services/documentary.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public recentlyAdded;
  public recentlyUpdated;
  public newDocumentaries;
  public newestUsers;
  public activeUsers;
  public activity;

  private recentlyAddedSubscription;
  private recentlyUpdatedSubscription;
  private newDocumentariesSubscription;
  private newestUsersSubscription;
  private activeUsersSubscription;
  private activitySubscription;

  constructor(
    private documentaryService: DocumentaryService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.fetchRecentlyAddedDocumentaries();
    this.fetchRecentlyUpdatedDocumentaries();
    this.fetchNewDocumentaries();
    this.fetchNewestUsers();
    this.fetchActiveUsers();
    this.fetchActivity();
  }

  fetchRecentlyAddedDocumentaries() {
    let params = new HttpParams();
  
    this.recentlyAddedSubscription = this.documentaryService.getRecentlyAddedDocumentaries(params)
      .subscribe(result => {
        let cardDecks = this.documentaryService.convertArrayOfDocumentariesToMap(result['items'], 3, 6);
        this.recentlyAdded = cardDecks;
      });
  }

  fetchRecentlyUpdatedDocumentaries() {
    let params = new HttpParams();

    this.recentlyAddedSubscription = this.documentaryService.getRecentlyUpdatedDocumentaries(params)
      .subscribe(result => {
        let cardDecks = this.documentaryService.convertArrayOfDocumentariesToMap(result['items'], 3, 6);
        this.recentlyUpdated = cardDecks;
      });
  }

  fetchNewDocumentaries() {
    let params = new HttpParams();

    this.newDocumentariesSubscription = this.documentaryService.getNewDocumentaries(params)
      .subscribe(result => {
        let cardDecks = this.documentaryService.convertArrayOfDocumentariesToMap(result['items'], 3, 6);
        this.newDocumentaries = cardDecks;
      });
  }

  fetchNewestUsers() {
    let params = new HttpParams();

    this.newestUsersSubscription = this.userService.getNewestUsers(params)
      .subscribe(result => {
        this.newestUsers = result['items'];
      });
  }

  fetchActiveUsers() {
    let params = new HttpParams();

    this.activeUsersSubscription = this.userService.getActiveUsers(params)
      .subscribe(result => {
        this.activeUsers = result['items'];
      });
  }

  fetchActivity() {
    this.activitySubscription = this.activityService.getActivityForWidget()
      .subscribe(result => {
        let arr = [];
        for (var key in result) {
          arr.push(result[key])
        }

        this.activity = arr;
      });
  }

  ngOnDestroy() {
    this.recentlyAddedSubscription.unsubscribe();
    this.recentlyUpdatedSubscription.unsubscribe();
    this.newDocumentariesSubscription.unsubscribe();
    this.newestUsersSubscription.unsubscribe();
    this.activeUsersSubscription.unsubscribe();
    this.activitySubscription.unsubscribe();
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
