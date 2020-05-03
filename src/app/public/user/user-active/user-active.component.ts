import { UserService } from './../../../services/user.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-active',
  templateUrl: './user-active.component.html',
  styleUrls: ['./user-active.component.css']
})
export class UserActiveComponent implements OnInit {

  private isFetchingActiveUsers = false;

  private activeUsersSubscription;

  private activeUsers;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.fetchActiveUsers();
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
    if (this.activeUsersSubscription != null) {
      this.activeUsersSubscription.unsubscribe();
    }
  }
}
