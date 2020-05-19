import { DocumentaryService } from './../../../services/documentary.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-documentary-recent',
  templateUrl: './documentary-recent.component.html',
  styleUrls: ['./documentary-recent.component.css']
})
export class DocumentaryRecentComponent implements OnInit {

  private recentlyAdded;

  private recentlyAddedSubscription;
  
  private isFetchingRecentlyAddedDocumentaries = false;

  private recentlyAddedOptions: OwlOptions = {
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
    margin: 10
  };

  constructor(
    private documentaryService: DocumentaryService
  ) { }

  ngOnInit() {
    this.fetchRecentlyAddedDocumentaries();
  }

  fetchRecentlyAddedDocumentaries() {
    this.isFetchingRecentlyAddedDocumentaries = true;
    let params = new HttpParams();

    this.recentlyAddedSubscription = this.documentaryService.getRecentlyAddedDocumentaries(params)
      .subscribe(result => {
        this.recentlyAdded = result['items'];
        console.log(result);

        this.isFetchingRecentlyAddedDocumentaries = false;
      });
  }

  ngOnDestroy() {
    this.recentlyAddedSubscription.unsubscribe();
  }
}
