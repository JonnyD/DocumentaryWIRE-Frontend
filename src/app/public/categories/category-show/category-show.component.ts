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
  private categoriesSubscription;
  private yearsSubscription;
  private routeParamsSubscription;

  config: any;
  private page;
  private previousPage;
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
      this.category = <Category> result[0];
      this.queryParamsSubscription = this.route
        .queryParams
        .subscribe(params => {
          this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
            this.page = +params['params']['page'] || 1;
            this.previousPage = this.page;
            this.fetchDocumentaries();
            this.fetchCategories();
            this.fetchDuration();
            this.fetchYears();
          });
      });
    });
  }

  fetchDocumentaries() {
    this.isFetchingDocumentaries = true;
    this.documentaries = [];

    if (this.documentariesSubscription != null) {
      this.documentariesSubscription.unsubscribe();
    }

    let params = new HttpParams();
    params = params.append('page', this.page.toString());
    
    let url = this.location.path();
    let hasPage = url.indexOf("/page") !== -1;

    if (!hasPage) {
      url = url + '/page/' + this.page;
    } else {
      let split = this.router.url.split("/page/")[0];
      url = split + '/page/' + this.page;
    }

    this.location.go(url);

    this.previousPage = this.page;
  
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
    this.routeParamsSubscription.unsubscribe();
  }
}
