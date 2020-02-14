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
  private routeParamsSubscription;

  config: any;
  private page;
  private previousPage;
  private categories;
  private duration;
  private years;

  isFetchingDocumentaries = false;
  isFetchingCategories = false;
  isFetchingYears = false;
  isFetchingDuration = false;

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
        
        this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
          this.page = +params['params']['page'] || 1;
          this.previousPage = this.page;
          this.fetchDocumentaries();
          this.fetchCategories();
          this.fetchYears();
          this.fetchDuration();
        });
      })
  }

  ngOnDestroy() {
    this.documentariesSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
    this.yearsSubscription.unsubscribe();
    this.routeParamsSubscription.unsubscribe();
  }

  fetchDocumentaries() {
    this.isFetchingDocumentaries = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());

    //this.location.go(this.router.url.split("?")[0], params.toString())
    console.log("this.location.path()");
    let url = this.location.path().replace(this.previousPage, this.page);
    let hasBrowseUrl = url.indexOf("/page") !== -1;

    console.log("hasBrowseUrl");
    console.log(hasBrowseUrl);
    if (!hasBrowseUrl) {
      url = url + '/page/' + this.page;
    }

    console.log("url");
    console.log(url);
    this.location.go(url);

    this.previousPage = this.page;
        console.log("page");
    console.log(this.page);

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
}
