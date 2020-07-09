import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from './../../services/watchlist.service';
import { Component, OnInit, Input } from '@angular/core';
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

  private documentary;
  private previousDocumentary;
  private user;
  private previousUser;

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
        this.documentary = +params['documentary'] || 'all';
        this.user = params['user'] || 'all';

        this.fetchWatchlists();
      })
  }

  fetchWatchlists() {
    let params = new HttpParams();
    
    params = params.append('page', this.page.toString());
    
    if (this.documentary) {
      if (this.documentary != 'all') {
        params = params.append('documentary', this.documentary.toString());
        if (this.documentary != this.previousDocumentary
          && this.previousDocumentary != null) {
          this.page = 1;
        }
      }
      this.previousDocumentary = this.documentary;
    }
    
    if (this.user) {
      if (this.user != 'all') {
        params = params.append('user', this.user.toString());
        if (this.user != this.user
          && this.previousUser != null) {
          this.page = 1;
        }
      }
      this.previousUser = this.user;
    }
    
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
