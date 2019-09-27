import { UserService } from './../../services/user.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/services/community.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  public communityItems;

  private queryParamsSubscription;
  private communtiyItemsSubscription;
  private newestUsersSubscription;
  private activeUsersSubscription;

  config: any;
  private page;
  private newestUsers;
  private activeUsers;

  isFetchingCommunityItems = false;
  isFetchingNewestUsers = false;
  isFetchingActiveUsers = false;

  constructor(
    private communityService: CommunityService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;
        this.fetchCommunityItems();
        this.fetchNewestUsers();
        this.fetchActiveUsers();
      })
  }

  fetchCommunityItems() {
    this.isFetchingCommunityItems = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());
  
    let amountPerPage = 20;
    params = params.append('amountPerPage', amountPerPage.toString());

    this.communtiyItemsSubscription = this.communityService.getAllCommunityItems(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 20,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.communityItems = result['items'];

        this.isFetchingCommunityItems = false;
      });
  }

  fetchNewestUsers() {
    this.isFetchingNewestUsers = true;

    let params = new HttpParams();

    this.newestUsersSubscription = this.userService.getNewestUsers(params)
      .subscribe(result => {
        this.newestUsers = result['items'];

        this.isFetchingNewestUsers = false;
      });
  }

  fetchActiveUsers() {
    this.isFetchingActiveUsers = true;

    let params = new HttpParams();

    this.activeUsersSubscription = this.userService.getActiveUsers(params)
      .subscribe(result => {
        this.activeUsers = result['items'];

        this.isFetchingActiveUsers = false;
      });
  }

  ngOnDestroy() {
    this.communtiyItemsSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
    this.newestUsersSubscription.unsubscribe();
    this.activeUsersSubscription.unsubscribe();
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchCommunityItems();
  }
}
