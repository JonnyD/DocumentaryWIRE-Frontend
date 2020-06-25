import { UserService } from './../../../services/user.service';
import { ComponentItem } from './../../../models/component-item.model';
import { Type } from './../../../models/type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from './../../../services/activity.service';
import { Activity } from './../../../models/activity.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-admin-activity-edit',
  templateUrl: './admin-activity-edit.component.html',
  styleUrls: ['./admin-activity-edit.component.css']
})
export class AdminActivityEditComponent implements OnInit {
  private editActivityForm: FormGroup;

  private activity: Activity;

  public types: Array<Type> = [
    { id: 'joined', name: 'Joined' },
    { id: 'comment', name: 'Comment' },
    { id: 'watchlist', name: 'Watchlist' },
    { id: 'added', name: 'Added' }
  ];

  public components: Array<ComponentItem> = [
    { id: 'user', name: 'User' },
    { id: 'documentary', name: 'Documentary' }
  ];

  constructor(
    private activityService: ActivityService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.activity = <Activity>result[0];

      this.initForm();
    })
  }

  initForm() {
    let type = this.activity.type;
    let component = this.activity.component;
    let groupNumber = this.activity.groupNumber;
    let user = this.activity.user;
    let objectId = this.activity.objectId;

    this.editActivityForm = new FormGroup({
      'type': new FormControl(type, [Validators.required]),
      'component': new FormControl(component, [Validators.required]),
      'groupNumber': new FormControl(groupNumber, [Validators.required]),
      'objectId': new FormControl(objectId, [Validators.required]),
    });
  }

  onSubmit() {
    let id = this.activity.id;
    let type = this.activity.type;
    let component = this.activity.component;
    let groupNumber = this.activity.groupNumber;
    let objectId = this.activity.objectId;

    let formValue = this.editActivityForm.value;

    this.activityService.editActivity(id, formValue)
      .subscribe(result => {
        this.router.navigate(["/admin/activity", id])
      });
  }
}
