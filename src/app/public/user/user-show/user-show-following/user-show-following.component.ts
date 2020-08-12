import { HttpParams } from '@angular/common/http';
import { UserService } from './../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowService } from './../../../../services/follow.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-show-following',
  templateUrl: './user-show-following.component.html',
  styleUrls: ['./user-show-following.component.css']
})
export class UserShowFollowingComponent implements OnInit {

  private user;
  private me;
  private following;

  private followingCount;
  private followerCount;

  private config;
  private page;

  private isFetchingUser = false;
  private isFetchingMe = false;
  private isFetchingFollowing = false;
  private isFetchingFollower = false;

  private isFollowing = false;

  private queryParamsSubscription;
  private meSubscription;
  private userSubscription;
  private followingSubscription;
  private followerSubscription;
  private deleteFollowSubscription;
  private createFollowSubscription;
  private getFollowByUserFromIdAndUserToId1Subscription;
  private getFollowByUserFromIdAndUserToId2Subscription;

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
          this.fetchFollowing();
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
  
  fetchFollowing(refresh: boolean = true) {
    if (refresh) {
      this.isFetchingFollowing = true;
    }

    let params = new HttpParams();
    params = params.append('page', this.page.toString());
    this.location.go(this.router.url.split("?")[0], params.toString());

    let pageSize = 5;
    params = params.append('amountPerPage', pageSize.toString());
    console.log("this.user");
    console.log(this.user);
    params = params.append('following', this.user.id);

    this.followingSubscription = this.followService.getAllFollows(params)
      .subscribe(result => {
        console.log("following result");
        console.log(result);
        this.config = {
          itemsPerPage: pageSize,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.following = result['items'];
        console.log("this.following");
        console.log(this.following);

        this.isFetchingFollowing = false;
      }, error => {
        console.log("follow error");
        console.log(error);
      });
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    let refresh = true;
    this.fetchFollowing(refresh);
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
            this.fetchFollowing(refresh);
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
            this.fetchFollowing(refresh);
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
    if (this.followingSubscription != null) {
      this.followingSubscription.unsubscribe();
    }
    if (this.deleteFollowSubscription != null) {
      this.deleteFollowSubscription.unsubscribe();
    }
    if (this.getFollowByUserFromIdAndUserToId1Subscription != null) {
      this.getFollowByUserFromIdAndUserToId1Subscription.unsubscribe();
    }
    if (this.getFollowByUserFromIdAndUserToId2Subscription != null) {
      this.getFollowByUserFromIdAndUserToId2Subscription.unsubscribe();
    }
    if (this.userSubscription != null) {
      this.userSubscription.unsubscribe();
    }
    if (this.followerSubscription != null) {
      this.followerSubscription.unsubscribe();
    }
  }
}
