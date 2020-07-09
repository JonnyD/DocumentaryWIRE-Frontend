import { FollowService } from './../../services/follow.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-admin-follows',
  templateUrl: './admin-follows.component.html',
  styleUrls: ['./admin-follows.component.css']
})
export class AdminFollowsComponent implements OnInit {
  config: any;
  private page;
  private follower;
  private following;

  private previousFollower;
  private previousFollowing;

  private queryParamsSubscription;
  private followsSubscription;

  private follows;

  constructor(
    private followService: FollowService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
    .queryParams
    .subscribe(params => {
      this.page = +params['page'] || 1;
      this.following = params['following'] || 'all';
      this.follower = params['follower'] || 'all';
      this.fetchFollows();
    })
  }

  fetchFollows() {
    let params = new HttpParams();
    
    if (this.follower) {
      if (this.follower != 'all') {
        params = params.append('follower', this.follower);
        if (this.follower != this.previousFollower) {
          this.page = 1;
        }
      }
      this.previousFollower = this.follower;
    }

    if (this.following) {
      if (this.following != 'all') {
        params = params.append('following', this.following);
        if (this.following != this.previousFollowing) {
          this.page = 1;
        }
      }
      this.previousFollowing = this.following;
    }

    params = params.append('page', this.page.toString());
    
    this.location.go(this.router.url.split("?")[0], params.toString());

    this.followsSubscription = this.followService.getAllFollows(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 12,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.follows = result['items'];
      })
  }

  pageChanged(event) {
    this.config.currentPage = event;
    this.page = event;
    this.fetchFollows();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.followsSubscription.unsubscribe();
  }

}
