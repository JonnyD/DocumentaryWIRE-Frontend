import { DomSanitizer } from '@angular/platform-browser';
import { DocumentaryService } from './../../../services/documentary.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-added',
  templateUrl: './user-added.component.html',
  styleUrls: ['./user-added.component.css']
})
export class UserAddedComponent implements OnInit {
  public user;
  public documentaries;

  config: any;
  private page;

  private isFetchingDocumentaries = true;

  private queryParamsSubscription;
  private documentariesSubscription;

  constructor(
    private documentaryService: DocumentaryService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.user = result[0];

      this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
          this.page = +params['page'] || 1;
          this.fetchDocumentariesAdded();
      });
    });
  }

  fetchDocumentariesAdded() {
    this.isFetchingDocumentaries = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());
  
    let amountPerPage = 5;
    params = params.append('amountPerPage', amountPerPage.toString());
    params = params.append('user', this.user.username);

    this.documentariesSubscription = this.documentaryService.getAllDocumentaries(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 5,
          currentPage: this.page,
          totalItems: result['count_results']
        };

        this.documentaries = result['items'];

        this.isFetchingDocumentaries = false;
      })

  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchDocumentariesAdded();
  }
  
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.documentariesSubscription.unsubscribe();
  }
}
