import { UserService } from './../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.css']
})
export class AdminUserDetailComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(result => {
      console.log("hi");
      console.log(result);
      this.user = <User> result[0];
    })
  }

}
