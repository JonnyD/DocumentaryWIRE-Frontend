import { SEOService } from './../../services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { DurationService } from './../../services/duration.service';
import { CategoryService } from './../../services/category.service';
import { YearService } from './../../services/year.service';
import { ActivityService } from './../../services/activity.service';
import { UserService } from './../../services/user.service';
import { DocumentaryService } from './../../services/documentary.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {PopoverModule} from 'ngx-smart-popover';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public newestUsers;
  public activeUsers;
  public featured;

  private featuredSubscription;

  isFetchingFeaturedDocumentaries = false;

  constructor(
    private documentaryService: DocumentaryService,
    private sanitizer: DomSanitizer,
    private seoService: SEOService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fetchFeaturedDocumentary();

    this.seoService.setPageTitle('Watch Documentaires Online | DocumentaryWIRE');
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

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
