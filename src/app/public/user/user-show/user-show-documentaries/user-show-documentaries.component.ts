import { FollowService } from './../../../../services/follow.service';
import { HttpParams } from '@angular/common/http';
import { UserService } from './../../../../services/user.service';
import { UserResolverService } from './../../../../services/user-resolver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentaryService } from './../../../../services/documentary.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-show-documentaries',
  templateUrl: './user-show-documentaries.component.html',
  styleUrls: ['./user-show-documentaries.component.css']
})
export class UserShowDocumentariesComponent implements OnInit {

  private user;
  private documentaries;
  private page;
  private me;
  private config;

  private followingCount;
  private followerCount;

  private isFetchingUser = false;
  private isFetchingMe = false;
  private isFetchingDocumentaries = false;
  private isFetchingFollower = false;

  private isFollowing = false;

  private queryParamsSubscription;
  private meSubscription;
  private documentarySubscription;
  private getFollowByUserFromIdAndUserToId1Subscription;
  private getFollowByUserFromIdAndUserToId2Subscription;
  private createFollowSubscription;
  private deleteFollowSubscription;
  private followerSubscription;

  constructor(
    private userService: UserService,
    private documentaryService: DocumentaryService,
    private followService: FollowService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
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
          this.fetchDocumentaries();
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
        this.fetchFollower();
        this.fetchCount();
      }, error => {
        console.log("error");
        console.log(error);

        this.isFetchingMe = false;
        this.fetchFollower();
        this.fetchCount();
      })
  }

  fetchDocumentaries() {
    this.isFetchingDocumentaries = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());
    this.location.go(this.router.url.split("?")[0], params.toString());

    let pageSize = 5;
    params = params.append('amountPerPage', pageSize.toString());
    params = params.append('addedBy', this.user.username);
    params = params.append('sort', 'createdAt-desc');

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
    this.fetchDocumentaries();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.meSubscription.unsubscribe();
    this.documentarySubscription.unsubscribe();
  }
}
