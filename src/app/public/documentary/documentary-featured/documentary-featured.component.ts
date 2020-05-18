import { DocumentaryService } from './../../../services/documentary.service';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-documentary-featured',
  templateUrl: './documentary-featured.component.html',
  styleUrls: ['./documentary-featured.component.css']
})
export class DocumentaryFeaturedComponent implements OnInit {

  private featured;

  private featuredSubscription;
  
  private isFetchingFeaturedDocumentaries = false;

  constructor(
    private documentaryService: DocumentaryService) { }

  ngOnInit() {
    this.fetchFeaturedDocumentary();
  }

  fetchFeaturedDocumentary() {
    this.isFetchingFeaturedDocumentaries = true;
    let params = new HttpParams();

    this.featuredSubscription = this.documentaryService.getFeaturedDocumentary(params)
      .subscribe(result => {
        this.featured = result['items'];
        console.log('featured');
        console.log(this.featured);
        this.isFetchingFeaturedDocumentaries = false;
      })
  }

  ngOnDestroy() {
    if (this.featuredSubscription != null) {
      this.featuredSubscription.unsubscribe();
    }
  }
}
