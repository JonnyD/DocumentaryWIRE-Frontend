import { SEOService } from './../../../services/seo.service';
import { YearService } from './../../../services/year.service';
import { DurationService } from './../../../services/duration.service';
import { DocumentaryService } from './../../../services/documentary.service';
import { HttpParams } from '@angular/common/http';
import { Category } from './../../../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-category-show',
  templateUrl: './category-show.component.html',
  styleUrls: ['./category-show.component.css']
})
export class CategoryShowComponent implements OnInit {
  public category;
  public documentaries;

  private documentariesSubscription;
  private queryParamsSubscription;
  private yearsSubscription;

  config: any;
  private page;
  private duration;
  private years;

  isFetchingDocumentaries = false;
  isFetchingDuration = false;
  isFetchingYears = false;
  
  constructor(
    private documentaryService: DocumentaryService,
    private durationService: DurationService,
    private yearService: YearService,
    private seoService: SEOService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.category = <Category> result[0];
      this.queryParamsSubscription = this.route
        .queryParams
        .subscribe(params => {
          this.page = +params['page'] || 1;
          this.fetchDocumentaries();
          this.fetchDuration();
          this.fetchYears();
      });
    });
  }

  refreshMetaTags(numberOfPages: number) {
    let pageTitle = 'Watch ' + this.category.name + ' Documentaries - Page ' + this.page + " | DocumentaryWIRE";
    this.seoService.refreshMetaTags(pageTitle, this.page, numberOfPages);
  }

  fetchDocumentaries() {
    this.isFetchingDocumentaries = true;
    this.documentaries = [];

    if (this.documentariesSubscription != null) {
      this.documentariesSubscription.unsubscribe();
    }

    let params = new HttpParams();
    params = params.append('page', this.page.toString());
    
    if (this.page > 1) {
      this.location.go(this.router.url.split("?")[0], params.toString());
    } else {
      this.location.go(this.router.url.split("?")[0]);
    }
  
    let amountPerPage = 6;
    params = params.append('amountPerPage', amountPerPage.toString());
    params = params.append('category', this.category.slug);

    this.documentariesSubscription = this.documentaryService.getAllDocumentaries(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 6,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.documentaries = result['items'];
        
        this.isFetchingDocumentaries = false;

        this.refreshMetaTags(result['number_of_pages']);
      });
  }

  fetchDuration() {
    this.isFetchingDuration = true;

    let duration = this.durationService.getAllDurations();
    this.duration = this.durationService.getColumnsForDuration(duration);

    this.isFetchingDuration = false;
  }

  fetchYears() {
    this.isFetchingYears = true;

    this.yearsSubscription = this.yearService.getAllYears()
      .subscribe(result => {
        this.years = this.yearService.getColumnsForYears(result);

        this.isFetchingYears = false;
      })
  }
  
  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchDocumentaries();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.documentariesSubscription.unsubscribe();
    this.yearsSubscription.unsubscribe();
  }
}
