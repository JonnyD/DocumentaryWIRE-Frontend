import { HttpParams } from '@angular/common/http';
import { WatchlistService } from './../../../services/watchlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-watchlist',
  templateUrl: './user-watchlist.component.html',
  styleUrls: ['./user-watchlist.component.css']
})
export class UserWatchlistComponent implements OnInit {
  public user;
  public watchlists;

  config: any;
  private page;

  private isFetchingWatchlists = true;

  private queryParamsSubscription;
  private watchlistsSubscription;

  constructor(
    private watchlistService: WatchlistService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.user = result[0];

      this.queryParamsSubscription = this.route
        .queryParams
        .subscribe(params => {
            this.page = +params['page'] || 1;
            this.fetchWatchlists();
      });
    });
  }

  fetchWatchlists() {
    this.isFetchingWatchlists = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());
  
    let amountPerPage = 5;
    params = params.append('amountPerPage', amountPerPage.toString());
    params = params.append('user', this.user.username);

    this.watchlistsSubscription = this.watchlistService.getAllWatchlists(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 5,
          currentPage: this.page,
          totalItems: result['count_results']
        };

        this.watchlists = result['items'];

        this.isFetchingWatchlists = false;
      })
  }
  
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchWatchlists();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.watchlistsSubscription.unsubscribe();
  }
}
