import { SEOService } from './../../services/seo.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/services/community.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  public communityItems;

  private queryParamsSubscription;
  private communtiyItemsSubscription;

  config: any;
  private page;

  isFetchingCommunityItems = false;

  constructor(
    private communityService: CommunityService,
    private seoService: SEOService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;

        this.fetchCommunityItems();
      });
  }

  refreshMetaTags(numberOfPages: number) {
    let pageTitle = "Community - Page " + this.page + " | DocumentaryWIRE";
    this.seoService.refreshMetaTags(pageTitle, this.page, numberOfPages);
  }

  fetchCommunityItems() {
    this.isFetchingCommunityItems = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());

    if (this.page > 1) {
      this.location.go(this.router.url.split("?")[0], params.toString());
    } else {
      this.location.go(this.router.url.split("?")[0]);
    }

    let amountPerPage = 20;
    params = params.append('amountPerPage', amountPerPage.toString());

    this.communtiyItemsSubscription = this.communityService.getAllCommunityItems(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 20,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.communityItems = result['items'];

        this.refreshMetaTags(result['number_of_pages']);

        this.isFetchingCommunityItems = false;
      });
  }

  ngOnDestroy() {
    this.communtiyItemsSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchCommunityItems();
  }
}
