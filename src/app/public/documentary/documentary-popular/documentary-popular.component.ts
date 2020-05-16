import { OwlOptions } from 'ngx-owl-carousel-o';
import { DocumentaryService } from './../../../services/documentary.service';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-documentary-popular',
  templateUrl: './documentary-popular.component.html',
  styleUrls: ['./documentary-popular.component.css']
})
export class DocumentaryPopularComponent implements OnInit {

  private popularDocumentaries;

  private popularDocumentariesSubscription;
  
  private isFetchingPopularDocumentaries = false;

  popularOptions: OwlOptions = {
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
    this.fetchPopularDocumentaries();
  }

  fetchPopularDocumentaries() {
    this.isFetchingPopularDocumentaries = true;

    let params = new HttpParams();

    this.popularDocumentariesSubscription = this.documentaryService.getPopularDocumentaries(params)
      .subscribe(result => {
        this.popularDocumentaries = result['items'];

        this.isFetchingPopularDocumentaries = false;
      });
  }

  ngOnDestroy() {
    this.popularDocumentariesSubscription.unsubscribe();
  }
}
