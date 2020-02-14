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
  private routeParamsSubscription;

  config: any;
  private page;
  private previousPage;
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
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.duration = result[0];
      this.queryParamsSubscription = this.route
        .queryParams
        .subscribe(params => {this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
          this.page = +params['params']['page'] || 1;
          
          this.fetchDocumentaries();
          this.fetchCategories();
          this.fetchDuration();
          this.fetchYears();

          console.log(this.duration);
        });
      });
    });
  }

  fetchDocumentaries() {
    this.isFetchingDocumentaries = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());

    let url = this.location.path();
    let hasPage = url.indexOf("/page") !== -1;
    console.log("url");
    console.log(url);
    console.log("hasPage");
    console.log(hasPage);
    if (!hasPage) {
      url = url + '/page/' + this.page;
    } else {
      let split = this.router.url.split("page/")[0];
      url = split + '/page/' + this.page;
    }

    this.location.go(url);

    this.previousPage = this.page;

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
