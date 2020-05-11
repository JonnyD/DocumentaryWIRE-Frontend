import { DocumentaryService } from './../../../services/documentary.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-documentary-recent-updated',
  templateUrl: './documentary-recent-updated.component.html',
  styleUrls: ['./documentary-recent-updated.component.css']
})
export class DocumentaryRecentUpdatedComponent implements OnInit {

  private recentlyUpdated;

  private recentlyUpdatedSubscription;

  private isFetchingRecentlyUpdatedDocumentaries = false;

  recentlyUpdatedOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoWidth: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true,
    margin: 10,
    navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
  };

  constructor(
    private documentaryService: DocumentaryService
  ) { }

  ngOnInit() {
    this.fetchRecentlyUpdatedDocumentaries();
  }

  fetchRecentlyUpdatedDocumentaries() {
    this.isFetchingRecentlyUpdatedDocumentaries = true;

    let params = new HttpParams();

    this.recentlyUpdatedSubscription = this.documentaryService.getRecentlyUpdatedDocumentaries(params)
      .subscribe(result => {
        this.recentlyUpdated = result['items'];

        this.isFetchingRecentlyUpdatedDocumentaries = false;
      });
  }

  ngOnDestroy() {
    this.recentlyUpdatedSubscription.unsubscribe();
  }
}
