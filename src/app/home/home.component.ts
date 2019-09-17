import { HttpParams } from '@angular/common/http';
import { DocumentaryService } from './../services/documentary.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public recentlyAdded;
  public recentlyUpdated;
  public newDocumentaries;

  private recentlyAddedSubscription;
  private recentlyUpdatedSubscription;
  private newDocumentariesSubscription;

  constructor(
    private documentaryService: DocumentaryService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.fetchRecentlyAddedDocumentaries();
    this.fetchRecentlyUpdatedDocumentaries();
    this.fetchNewDocumentaries();
  }

  fetchRecentlyAddedDocumentaries() {
    let params = new HttpParams();
  
    this.recentlyAddedSubscription = this.documentaryService.getRecentlyAddedDocumentaries(params)
      .subscribe(result => {
        this.recentlyAdded = result['items'];
        console.log(result);
      });
  }

  fetchRecentlyUpdatedDocumentaries() {
    let params = new HttpParams();

    this.recentlyAddedSubscription = this.documentaryService.getRecentlyUpdatedDocumentaries(params)
      .subscribe(result => {
        this.recentlyUpdated = result['items'];
        console.log(result);
      });
  }

  fetchNewDocumentaries() {
    let params = new HttpParams();

    this.newDocumentariesSubscription = this.documentaryService.getNewDocumentaries(params)
      .subscribe(result => {
        this.newDocumentaries = result['items'];
        console.log(result);
      });
  }

  ngOnDestroy() {
    this.recentlyAddedSubscription.unsubscribe();
    this.recentlyUpdatedSubscription.unsubscribe();
    this.newDocumentariesSubscription.unsubscribe();
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
