import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  public users;

  config: any;
  private page;

  private queryParamsSubscription;
  private getAllUsersSubscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
    .queryParams
    .subscribe(params => {
      this.page = +params['page'] || 1;
      this.fetchUsers();
    })
  }

  fetchUsers() {
    let params = new HttpParams();
    params = params.append('sort', 'createdAt-desc');
    params = params.append('page', this.page.toString());
    
    this.location.go(this.router.url.split("?")[0], params.toString());

    this.getAllUsersSubscription = this.userService.getAllUsers(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 12,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.users = result['items'];
      })
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchUsers();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.getAllUsersSubscription.unsubscribe();
  }
}
