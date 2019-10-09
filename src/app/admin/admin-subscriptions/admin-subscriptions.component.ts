import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-admin-subscriptions',
  templateUrl: './admin-subscriptions.component.html',
  styleUrls: ['./admin-subscriptions.component.css']
})
export class AdminSubscriptionsComponent implements OnInit {
  config: any;
  private page;

  private queryParamsSubscription;
  private subscriptionsSubscription;

  private subscriptions;

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
      this.fetchSubscriptions();
    })
  }

  fetchSubscriptions() {
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
        this.subscriptions = result['items'];
      })
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchSubscriptions();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.subscriptionsSubscription.unsubscribe();
  }

}
