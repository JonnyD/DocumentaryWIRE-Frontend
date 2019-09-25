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

  config: any;
  private page;
  private categories;
  private duration;
  private years;
  
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
          this.page = +params['page'] || 1;
          this.fetchDocumentaries();
          this.fetchCategories();
          this.fetchDuration();
          this.fetchYears();
      });
    });
  }

  fetchDocumentaries() {
    let params = new HttpParams();
    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());
  
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
        console.log(result);
      });
  }

  fetchCategories() {
    this.categoriesSubscription = this.categoryService.getAllCategories()
      .subscribe(result => {
        this.categories = this.categoryService.getColumnsForCategories(result);
      })
  }

  fetchDuration() {
    let duration = this.durationService.getAllDurations();
    this.duration = this.durationService.getColumnsForDuration(duration);
  }

  fetchYears() {
    this.yearsSubscription = this.yearService.getAllYears()
      .subscribe(result => {
        this.years = this.yearService.getColumnsForYears(result);
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
