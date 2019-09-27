import { HttpParams } from '@angular/common/http';
import { Year } from './../../../models/year.model';
import { ActivatedRoute, Router } from '@angular/router';
import { YearService } from 'src/app/services/year.service';
import { DurationService } from './../../../services/duration.service';
import { DocumentaryService } from './../../../services/documentary.service';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-year-show',
  templateUrl: './year-show.component.html',
  styleUrls: ['./year-show.component.css']
})
export class YearShowComponent implements OnInit {
  public year;
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

  isFetchingDocumentaries = false;
  isFetchingCategories = false;
  isFetchingDuration = false;
  isFetchingYears = false;
  
  constructor(
    private categoryService: CategoryService,
    private documentaryService: DocumentaryService,
    private durationService: DurationService,
    private yearService: YearService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.year = result[0];
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

  fetchDocumentaries() {
    this.isFetchingDocumentaries = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());
  
    let amountPerPage = 6;
    params = params.append('amountPerPage', amountPerPage.toString());
    params = params.append('year', this.year.toString());

    this.documentariesSubscription = this.documentaryService.getAllDocumentaries(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 6,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.documentaries = result['items'];

        this.isFetchingDocumentaries = false;
      });
  }

  fetchCategories() {
    this.isFetchingCategories = true;

    this.categoriesSubscription = this.categoryService.getAllCategories()
      .subscribe(result => {
        this.categories = this.categoryService.getColumnsForCategories(result);

        this.isFetchingCategories = false;
      })
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
    this.categoriesSubscription.unsubscribe();
    this.yearsSubscription.unsubscribe();
  }
}
