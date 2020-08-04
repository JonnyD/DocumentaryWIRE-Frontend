import { HttpParams } from '@angular/common/http';
import { UserService } from './../../../../services/user.service';
import { UserResolverService } from './../../../../services/user-resolver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentaryService } from './../../../../services/documentary.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-show-documentaries',
  templateUrl: './user-show-documentaries.component.html',
  styleUrls: ['./user-show-documentaries.component.css']
})
export class UserShowDocumentariesComponent implements OnInit {

  private user;
  private documentaries;
  private page;
  private me;
  private config;

  private isFetchingUser = false;
  private isFetchingMe = false;
  private isFetchingDocumentaries = false;

  private queryParamsSubscription;
  private meSubscription;
  private documentarySubscription;

  constructor(
    private userService: UserService,
    private documentaryService: DocumentaryService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) { }

  

  ngOnInit() {
    this.isFetchingUser = true;

    this.route.data.subscribe(result => {
      this.user = result[0];

      this.isFetchingUser = false;

      this.queryParamsSubscription = this.route
        .queryParams
        .subscribe(params => {
          this.page = +params['page'] || 1;

          this.fetchMe();
          this.fetchDocumentaries();
        });
    });
  }

  fetchMe() {
    this.isFetchingMe = true;

    this.meSubscription = this.userService.getMe()
      .subscribe(result => {
        console.log(result);
        this.me = result;

        this.isFetchingMe = false;
      }, error => {
        console.log("error");
        console.log(error);

        this.isFetchingMe = false;
      })
  }

  fetchDocumentaries() {
    this.isFetchingDocumentaries = true;

    let params = new HttpParams();
    params = params.append('page', this.page.toString());
    this.location.go(this.router.url.split("?")[0], params.toString());

    let pageSize = 5;
    params = params.append('amountPerPage', pageSize.toString());
    params = params.append('addedBy', this.user.username);
    params = params.append('sort', 'createdAt-desc');

    this.documentarySubscription = this.documentaryService.getAllDocumentaries(params)
      .subscribe(result => {
        this.config = {
          itemsPerPage: pageSize,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.documentaries = result['items'];

        console.log(this.documentaries);

        this.isFetchingDocumentaries = false;
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
    this.meSubscription.unsubscribe();
    this.documentarySubscription.unsubscribe();
  }
}
