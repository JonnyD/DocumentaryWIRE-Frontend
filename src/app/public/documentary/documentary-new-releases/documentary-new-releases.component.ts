import { DocumentaryService } from './../../../services/documentary.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-documentary-new-releases',
  templateUrl: './documentary-new-releases.component.html',
  styleUrls: ['./documentary-new-releases.component.css']
})
export class DocumentaryNewReleasesComponent implements OnInit {

  private newDocumentaries;

  private newDocumentariesSubscription;
  
  private isFetchingNewDocumentaries = false;

  newOptions: OwlOptions = {
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
    this.fetchNewDocumentaries();
  }

  fetchNewDocumentaries() {
    this.isFetchingNewDocumentaries = true;

    let params = new HttpParams();

    this.newDocumentariesSubscription = this.documentaryService.getNewDocumentaries(params)
      .subscribe(result => {
        this.newDocumentaries = result['items'];

        this.isFetchingNewDocumentaries = false;
      });
  }

  ngOnDestroy() {
    this.newDocumentariesSubscription.unsubscribe();
  }
}
