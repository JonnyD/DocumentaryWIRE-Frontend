import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from './../../../services/watchlist.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-watchlist-detail',
  templateUrl: './admin-watchlist-detail.component.html',
  styleUrls: ['./admin-watchlist-detail.component.css']
})
export class AdminWatchlistDetailComponent implements OnInit {

  private watchlist;

  constructor(
    private watchlistService: WatchlistService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.watchlist = result[0];
      console.log("watchlist");
      console.log(this.watchlist);
    })
  }

}
