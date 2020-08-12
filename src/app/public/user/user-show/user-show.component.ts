import { FollowService } from './../../../services/follow.service';
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

  private followingCount;
  private followerCount;

  private isFetchingUser = true;
  private isFetchingActivity = true;
  private isFetchingDocumentaries = true;
  private isFetchingWatchlisted = true;
  private isFetchingMe = true;
  private isFetchingFollower = true;

  private isFollowing = false;

  private activitySubscription;
  private queryParamsSubscription;
  private documentarySubscription;
  private watchlistSubscription;
  private meSubscription;
  private followerSubscription;
  private getFollowByUserFromIdAndUserToId1Subscription;
  private getFollowByUserFromIdAndUserToId2Subscription;
  private createFollowSubscription;
  private deleteFollowSubscription;

  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private documentaryService: DocumentaryService,
    private watchlistService: WatchlistService,
    private followService: FollowService,
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
        console.log("me result");
        console.log(result);
        this.me = result;

        this.isFetchingMe = false;

        this.fetchFollower();
        this.fetchCount();
      }, error => {
        console.log("error");
        console.log(error);

        this.isFetchingMe = false;

        this.fetchFollower();
        this.fetchCount();
      });
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

  fetchFollower(refresh: boolean = true) {
    if (refresh) {
      this.isFetchingFollower = true;
    }

    console.log("MEE");
    console.log(this.me);
    let userFromId = this.me.id;
    let userToId = this.user.id;

    this.followerSubscription = this.followService
      .getFollowByUserFromIdAndUserToId(userFromId, userToId)
      .subscribe(result => {
        console.log("result follow");
        console.log(result);
        this.isFollowing = true;
        this.isFetchingFollower = false;
      }, error => {
        console.log("error");
        console.log(error);

        this.isFollowing = false;
        this.isFetchingFollower = false;
      });
  }

  follow(userToId: number) {
    console.log("userToId");
    console.log(userToId);
    let userFromId = this.me.id;

    this.getFollowByUserFromIdAndUserToId1Subscription = this.followService
      .getFollowByUserFromIdAndUserToId(userFromId, userToId)
      .subscribe(result => {
        console.log("follow result");
        console.log(result);
      }, error => {
        console.log(error);
        let follow = {
          'userFrom': userFromId,
          'userTo': userToId
        };
        this.createFollowSubscription = this.followService
          .createFollow(follow)
          .subscribe(result => {
            let refresh = false;
            this.fetchFollower(refresh);
            this.increaseFollowerCount();
          })
      });
  }

  unfollow(userToId: number) {
    let userFromId = this.me.id;

    this.getFollowByUserFromIdAndUserToId2Subscription = this.followService
      .getFollowByUserFromIdAndUserToId(userFromId, userToId)
      .subscribe(result => {
        this.deleteFollowSubscription = this.followService.deleteFollow(result.id)
          .subscribe(result => {
            let refresh = false;
            this.fetchFollower(refresh);
            this.decraseFollowerCount();
          }, error => {

          });
      }, error => {

      });
  }

  fetchCount() {
    this.followingCount = this.user.followingCount;
    this.followerCount = this.user.followerCount;
  }

  decraseFollowerCount() {
    this.followerCount = this.followerCount - 1;
  }

  increaseFollowerCount() {
    this.followerCount = this.followerCount + 1;
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchActivity();
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
    if (this.getFollowByUserFromIdAndUserToId1Subscription != null) {
      this.getFollowByUserFromIdAndUserToId1Subscription.unsubscribe();
    }
    if (this.getFollowByUserFromIdAndUserToId2Subscription != null) {
      this.getFollowByUserFromIdAndUserToId2Subscription.unsubscribe();
    }
    if (this.createFollowSubscription != null) {
      this.createFollowSubscription.unsubscribe();
    }
    if (this.deleteFollowSubscription != null) {
      this.deleteFollowSubscription.unsubscribe();
    }
    this.meSubscription.unsubscribe();
    this.followerSubscription.unsubscribe();
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
