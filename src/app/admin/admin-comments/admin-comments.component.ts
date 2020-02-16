import { Status } from './../../models/status.model';
import { Comment } from './../../models/comment.model';
import { DocumentaryService } from './../../services/documentary.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommnentService } from 'src/app/services/comment.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.css']
})
export class AdminCommentsComponent implements OnInit {

  private commentsSubscription;
  private queryParamsSubscription;

  private comments: Array<Comment>;

  private page;
  private documentary;
  private user;
  private status;

  private previousDocumentary;
  private previousUser;
  private previousStatus;

  private config;

  public statuses: Array<Status> = [
    { id: 'published', name: 'Published' },
    { id: 'pending', name: 'Pending' },
    { id: 'rejected', name: 'Rejected' }
  ];

  constructor(
    private commentsService: CommnentService,
    private documentaryService: DocumentaryService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;
        this.documentary = +params['documentary'] || 'all';
        this.user = +params['user'] || 'all';
        this.status = +params['status'] || 'all';

        this.fetchComments();
      })
  }

  fetchComments() {
    let params = new HttpParams();

    if (this.documentary) {
      if (this.documentary != 'all') {
        params = params.append('documentary', this.documentary);
        if (this.documentary != this.previousDocumentary) {
          this.page = 1;
        }
      }
      this.previousDocumentary = this.documentary;
    }

    if (this.user) {
      if (this.user != 'all') {
        params = params.append('user', this.user);
        if (this.user != this.previousUser) {
          this.page = 1;
        }
      }
      this.previousUser = this.user;
    }

    if (this.status) {
      if (this.status != 'all') {
        params = params.append('status', this.status);
        if (this.status != this.previousStatus) {
          this.page = 1;
        }
      }
      this.previousStatus = this.status;
    }

    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());
  
    this.commentsSubscription = this.commentsService.getAllComments(params)
      .subscribe(
        result => {
          this.config = {
            itemsPerPage: 12,
            currentPage: this.page,
            totalItems: result['count_results']
          };
          this.comments = result['items'];
        }
      )
  }
  
  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchComments();
  }

  onStatusSelected(value: string) {
    this.status = value;
    this.fetchComments();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
  }
}
