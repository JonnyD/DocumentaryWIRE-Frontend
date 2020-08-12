import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../../services/user.service';
import { FollowService } from './../../../../services/follow.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-show-followers',
  templateUrl: './user-show-followers.component.html',
  styleUrls: ['./user-show-followers.component.css']
})
export class UserShowFollowersComponent implements OnInit {

  private user;
  private me;
  private followers;

  private config;
  private page;

  private isFetchingUser = false;
  private isFetchingMe = false;
  private isFetchingFollowers = false;
  private isFetchingFollower = false;

  private isFollowing = false;

  private followingCount;
  private followerCount;

  private queryParamsSubscription;
  private meSubscription;
  private followersSubscription;
  private getFollowByUserFromIdAndUserToId1Subscription;
  private getFollowByUserFromIdAndUserToId2Subscription;
  private createFollowSubscription;
  private deleteFollowSubscription;
  private followerSubscription;

  constructor(
    private followService: FollowService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
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
          this.fetchFollowers();
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

  fetchFollowers(refresh: boolean = true) {
    if (refresh) {
      this.isFetchingFollowers = true;
    }

    let params = new HttpParams();
    params = params.append('page', this.page.toString());
    this.location.go(this.router.url.split("?")[0], params.toString());
    
    let pageSize = 5;
    params = params.append('amountPerPage', pageSize.toString());
    params = params.append('follower', this.user.id);

    this.followersSubscription = this.followService.getAllFollows(params)
      .subscribe(result => {
        console.log("follower result");
        console.log(result);
        this.config = {
          itemsPerPage: pageSize,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.followers = result['items'];
        
        this.isFetchingFollowers = false;
      }, error => {
        console.log("follower error");
        console.log(error);
      });
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchFollowers();
  }

  followTop(userToId: number) {
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
            this.fetchFollowers(refresh);
            this.increaseFollowerCount();
          })
      });
  }

  unfollowTop(userToId: number) {
    let userFromId = this.me.id;

    this.getFollowByUserFromIdAndUserToId2Subscription = this.followService
      .getFollowByUserFromIdAndUserToId(userFromId, userToId)
      .subscribe(result => {
        this.deleteFollowSubscription = this.followService.deleteFollow(result.id)
          .subscribe(result => {
            let refresh = false;
            this.fetchFollower(refresh);
            this.fetchFollowers(refresh);
            this.decraseFollowerCount();
          }, error => {

          });
      }, error => {

      });
  }

  followFromSnippet(userToId: number) {
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
            this.fetchFollowers(refresh);
            this.increaseFollowerCount();
          })
      });
  }
  
  unfollowFromSnippet(userToId: number) {
    let userFromId = this.me.id;

    this.getFollowByUserFromIdAndUserToId2Subscription = this.followService
      .getFollowByUserFromIdAndUserToId(userFromId, userToId)
      .subscribe(result => {
        this.deleteFollowSubscription = this.followService.deleteFollow(result.id)
          .subscribe(result => {
            let refresh = false;
            this.fetchFollowers(refresh);
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

  ngOnDestroy() {
    this.meSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
    this.followersSubscription.unsubscribe();
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
  }
}
