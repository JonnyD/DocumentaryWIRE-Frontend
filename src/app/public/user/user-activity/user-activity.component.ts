import { ActivityService } from './../../../services/activity.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.css']
})
export class UserActivityComponent implements OnInit {
  public user;
  public activity;

  config: any;
  private page;

  public isFetchingActivity = true;

  private queryParamsSubscription;
  private activitySubscription;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.user = result[0];

      this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
          this.page = +params['page'] || 1;
          this.fetchActivity();
    });
    });
  }

  fetchActivity() {
    this.isFetchingActivity = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());
  
    let amountPerPage = 6;
    params = params.append('amountPerPage', amountPerPage.toString());
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

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchActivity();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.activitySubscription.unsubscribe();
  }
}
