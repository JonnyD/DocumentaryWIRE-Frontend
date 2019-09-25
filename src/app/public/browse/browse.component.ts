import { DurationService } from './../../services/duration.service';
import { CategoryService } from './../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentaryService } from './../../services/documentary.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { YearService } from 'src/app/services/year.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  public documentaries;

  private documentariesSubscription;
  private queryParamsSubscription;
  private categoriesSubscription;
  private durationSubscription;
  private yearsSubscription;

  config: any;
  private page;
  private categories;
  private duration;
  private years;

  constructor(
    private documentaryService: DocumentaryService,
    private categoryService: CategoryService,
    private durationService: DurationService,
    private yearService: YearService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;
        this.fetchDocumentaries();
        this.fetchCategories();
        this.fetchYears();
        this.fetchDuration();
      })
  }

  ngOnDestroy() {
    this.documentariesSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
    this.durationSubscription.unsubscribe();
    this.yearsSubscription.unsubscribe();
  }

  fetchDocumentaries() {
    console.log("page:" + this.page);
    let params = new HttpParams();
    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());
  
    let amountPerPage = 6;
    params = params.append('amountPerPage', amountPerPage.toString());

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
}
