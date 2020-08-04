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

  private queryParamsSubscription;
  private meSubscription;
  private followersSubscription;

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
      }, error => {
        console.log("error");
        console.log(error);

        this.isFetchingMe = false;
      })
  }

  fetchFollowers() {
    this.isFetchingFollowers = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());
    this.location.go(this.router.url.split("?")[0], params.toString());
    
    let pageSize = 5;
    params = params.append('amountPerPage', pageSize.toString());
    params = params.append('follower', this.user.id);

    this.followersSubscription = this.followService.getAllFollows(params)
      .subscribe(result => {
        console.log("watchlist result");
        console.log(result);
        this.config = {
          itemsPerPage: pageSize,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.followers = result['items'];

        this.isFetchingFollowers = false;
      }, error => {
        console.log("watchlist error");
        console.log(error);
      });
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchFollowers();
  }

  ngOnDestroy() {
    this.meSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
    this.followersSubscription.unsubscribe();
  }
}
