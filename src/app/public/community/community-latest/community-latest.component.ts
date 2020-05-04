import { ActivityService } from './../../../services/activity.service';
import { CommunityService } from 'src/app/services/community.service';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-community-latest',
  templateUrl: './community-latest.component.html',
  styleUrls: ['./community-latest.component.css']
})
export class CommunityLatestComponent implements OnInit {

  private activity;

  private activitySubscription;
  
  private isFetchingActivity = false;

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.fetchActivity();
  }

  fetchActivity() {
    this.isFetchingActivity = true;

    this.activitySubscription = this.activityService.getActivityForRecentWidget(new HttpParams)
      .subscribe(result => {
        let arr = [];
        for (var key in result) {
          arr.push(result[key])
        }

        this.activity = arr;

        this.isFetchingActivity = false;
      });
  }
}
