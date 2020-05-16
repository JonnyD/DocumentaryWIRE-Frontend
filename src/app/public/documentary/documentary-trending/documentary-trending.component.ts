import { DocumentaryService } from './../../../services/documentary.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-documentary-trending',
  templateUrl: './documentary-trending.component.html',
  styleUrls: ['./documentary-trending.component.css']
})
export class DocumentaryTrendingComponent implements OnInit {

  private trending;

  private trendingSubscription;

  private isFetchingTrendingDocumentaries = false;

  trendingOptions: OwlOptions = {
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
    private documentaryService: DocumentaryService) { }

  ngOnInit() {
    this.fetchTrendingDocumentaries();
  }

  fetchTrendingDocumentaries() {
    this.isFetchingTrendingDocumentaries = true;
    let params = new HttpParams();

    this.trendingSubscription = this.documentaryService.getTrendingDocumentaries(params)
      .subscribe(result => {
        this.trending = result['items'];
        console.log(result);

        this.isFetchingTrendingDocumentaries = false;
      });
  }

  ngOnDestroy() {
    this.trendingSubscription.unsubscribe();
  }
}
