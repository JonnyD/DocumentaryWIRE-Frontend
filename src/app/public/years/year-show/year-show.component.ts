import { SEOService } from './../../../services/seo.service';
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

  config: any;
  private page;

  isFetchingDocumentaries = false;

  constructor(
    private documentaryService: DocumentaryService,
    private seoService: SEOService,
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
        });
    });
  }

  refreshMetaTags(numberOfPages: number) {
    let pageTitle = "Documentaries Released in " + this.year + " - Page " + this.page + " | DocumentaryWIRE";
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
    params = params.append('year', this.year.toString());

    this.documentariesSubscription = this.documentaryService.getAllDocumentaries(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 6,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.documentaries = result['items'];

        this.refreshMetaTags(result['number_of_pages']);

        this.isFetchingDocumentaries = false;
      });
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
  }
}
