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
  
  private config;
  private page;

  private isFetchingUser = false;
  private isFetchingMe = false;
  private isFetchingFollowing = false;

  private queryParamsSubscription;
  private meSubscription;
  private followingSubscription;

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
      }, error => {
        console.log("error");
        console.log(error);

        this.isFetchingMe = false;
      })
  }

  fetchFollowing() {
    this.isFetchingFollowing = true;

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
        console.log("watchlist result");
        console.log(result);
        this.config = {
          itemsPerPage: pageSize,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.following = result['items'];

        this.isFetchingFollowing = false;
      }, error => {
        console.log("watchlist error");
        console.log(error);
      });
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchFollowing();
  }

  ngOnDestroy() {
    this.meSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
    this.followingSubscription.unsubscribe();
  }
}
