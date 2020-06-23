import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-admin-follows',
  templateUrl: './admin-follows.component.html',
  styleUrls: ['./admin-follows.component.css']
})
export class AdminFollowsComponent implements OnInit {
  config: any;
  private page;

  private queryParamsSubscription;
  private subscriptionsSubscription;

  private follows;

  constructor(
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
    .queryParams
    .subscribe(params => {
      this.page = +params['page'] || 1;
      this.fetchFollows();
    })
  }

  fetchFollows() {
    let params = new HttpParams();

    params = params.append('page', this.page.toString());
    
    this.location.go(this.router.url.split("?")[0], params.toString());

    this.subscriptionsSubscription = this.subscriptionService.getAllSubscriptions(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 12,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.follows = result['items'];
      })
  }

  pageChanged(event) {
    this.config.currentPage = event;
    this.page = event;
    this.fetchFollows();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.subscriptionsSubscription.unsubscribe();
  }

}
