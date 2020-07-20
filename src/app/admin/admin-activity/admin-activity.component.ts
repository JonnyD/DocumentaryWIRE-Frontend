import { ComponentItem } from './../../models/component-item.model';
import { Type } from './../../models/type.model';
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
  private type;
  private component;
  private user;

  private previousType;
  private previousComponent;
  private previousUser;

  private types;
  private components;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.types = this.activityService.getTypes();
    this.components = this.activityService.getComponents();

    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;
        this.user = params['user'] || 'all';
        this.type = params['type'] || 'all';
        this.component = params['component'] || 'all';

        this.fetchActivities();
      })
  }

  fetchActivities() {
    let params = new HttpParams();

    if (this.user) {
      if (this.user != 'all') {
        params = params.append('user', this.user);
        if (this.user != this.previousUser) {
          this.page = 1;
        }
      }
      this.previousUser = this.user;
    }

    if (this.type) {
      if (this.type != 'all') {
        params = params.append('type', this.type);
        if (this.type != this.previousType) {
          this.page = 1;
        }
      }
      this.previousType = this.type;
    }

    if (this.component) {
      if (this.component != 'all') {
        params = params.append('component', this.component);
        if (this.component != this.previousComponent) {
          this.page = 1;
        }
      }
      this.previousComponent = this.component;
    }

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

  onTypeSelected(value: string) {
    this.type = value;
    this.fetchActivities();
  }

  onComponentSelected(value: string) {
    this.component = value;
    this.fetchActivities();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.activitiesSubscription.unsubscribe();
  }
}
