import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from './../../services/watchlist.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-admin-watchlists',
  templateUrl: './admin-watchlists.component.html',
  styleUrls: ['./admin-watchlists.component.css']
})
export class AdminWatchlistsComponent implements OnInit {
  private watchlists;

  private config: any;
  private page;

  private queryParamsSubscription;
  private getAllWatchlistsSubscription;

  constructor(
    private watchlistService: WatchlistService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;
        this.fetchWatchlists();
      })
  }

  fetchWatchlists() {
    let params = new HttpParams();
    params = params.append('sort', 'createdAt-desc');
    params = params.append('page', this.page.toString());
    
    this.location.go(this.router.url.split("?")[0], params.toString());

    this.getAllWatchlistsSubscription = this.watchlistService.getAllWatchlists(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 12,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.watchlists = result['items'];
      })
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchWatchlists();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.getAllWatchlistsSubscription.unsubscribe();
  }
}
