import { HttpParams } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  private isFetchingNewestUsers = false;

  private newestUsersSubscription;

  private newestUsers;
  
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.fetchNewestUsers();
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

  ngOnDestroy() {
    if (this.newestUsersSubscription != null) {
      this.newestUsersSubscription.unsubscribe();
    }
  }
}
