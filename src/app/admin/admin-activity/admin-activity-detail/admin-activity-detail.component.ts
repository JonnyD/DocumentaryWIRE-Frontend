import { Activity } from './../../../models/activity.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-activity-detail',
  templateUrl: './admin-activity-detail.component.html',
  styleUrls: ['./admin-activity-detail.component.css']
})
export class AdminActivityDetailComponent implements OnInit {
  private activity: Activity;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.activity = <Activity> result[0];
    })
  }

}
