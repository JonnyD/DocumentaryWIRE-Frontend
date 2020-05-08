import { SEOService } from './../../services/seo.service';
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

  config: any;
  private page;

  isFetchingDocumentaries = false;

  constructor(
    private documentaryService: DocumentaryService,
    private seoService: SEOService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;
        this.fetchDocumentaries();
      })
  }

  refreshMetaTags(numberOfPages) {
    let pageTitle = 'Watch Documentaries - Page ' + this.page + " | DocumentaryWIRE";
    this.seoService.refreshMetaTags(pageTitle, this.page, numberOfPages);
  }

  ngOnDestroy() {
    this.documentariesSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
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
  
  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchDocumentaries();
  }
}
