import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from './../../services/activity.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-admin-activity',
  templateUrl: './admin-activity.component.html',
  styleUrls: ['./admin-activity.component.css']
})
export class AdminActivityComponent implements OnInit {
  private activities;

  private queryParamsSubscription;
  private activitiesSubscription;

  config: any;
  private page;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;

        this.fetchActivities();
      })
  }

  fetchActivities() {
    let params = new HttpParams();

    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());

    this.activitiesSubscription = this.activityService.getAllActivities(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 50,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.activities = result['items'];
      })
  }
  
  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchActivities();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.activitiesSubscription.unsubscribe();
  }
}
