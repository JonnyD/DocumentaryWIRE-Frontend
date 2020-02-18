import { SEOService } from './../../../services/seo.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YearService } from 'src/app/services/year.service';
import { DurationService } from './../../../services/duration.service';
import { DocumentaryService } from './../../../services/documentary.service';
import { CategoryService } from './../../../services/category.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-duration-show',
  templateUrl: './duration-show.component.html',
  styleUrls: ['./duration-show.component.css']
})
export class DurationShowComponent implements OnInit {
  public documentaries;

  private documentariesSubscription;
  private queryParamsSubscription;
  private categoriesSubscription;
  private yearsSubscription;

  config: any;
  private page;
  private categories;
  private duration;
  private years;
  private durationList;

  isFetchingDocumentaries = false;
  isFetchingCategories = false;
  isFetchingDuration = false;
  isFetchingYears = false;

  constructor(
    private categoryService: CategoryService,
    private documentaryService: DocumentaryService,
    private durationService: DurationService,
    private yearService: YearService,
    private seoService: SEOService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.duration = result[0];
      this.queryParamsSubscription = this.route
        .queryParams
        .subscribe(params => {
          this.page = +params['page'] || 1;

          this.fetchDocumentaries();
          this.fetchCategories();
          this.fetchDuration();
          this.fetchYears();
        });
    });
  }

  refreshMetaTags(numberOfPages: number) {
    let pageTitle = "Watch Documentaries with a duration " + this.duration.display + " Page " + this.page;
    this.seoService.refreshMetaTags(pageTitle, this.page, numberOfPages);
  }

  fetchDocumentaries() {
    this.isFetchingDocumentaries = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());

    if (this.page > 1) {
      this.location.go(this.router.url.split("?")[0], params.toString());
    } else {
      this.location.go(this.router.url.split("?")[0]);
    }

    let amountPerPage = 6;
    params = params.append('amountPerPage', amountPerPage.toString());
    params = params.append('duration', this.duration.slug.toString());

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

  fetchCategories() {
    this.isFetchingCategories = true;

    this.categoriesSubscription = this.categoryService.getAllCategories(new HttpParams)
      .subscribe(result => {
        this.categories = this.categoryService.getColumnsForCategories(result);

        this.isFetchingCategories = false;
      })
  }

  fetchDuration() {
    this.isFetchingDuration = true;

    let durationList = this.durationService.getAllDurations();
    this.durationList = this.durationService.getColumnsForDuration(durationList);

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
    this.categoriesSubscription.unsubscribe();
    this.yearsSubscription.unsubscribe();
  }
}
