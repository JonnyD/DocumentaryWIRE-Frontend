import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user.model';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit {

  editUserForm: FormGroup;
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.user = <User> result[0];
      this.initForm();
    })
  }

  initForm() {
    let username = this.user.username;
    let name = this.user.name;
    let avatar = this.user.avatar;
    let roles = this.user.roles;
  }
}
