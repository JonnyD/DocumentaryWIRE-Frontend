import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from './../../services/email.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Email } from 'src/app/models/email.model';

@Component({
  selector: 'app-admin-emails',
  templateUrl: './admin-emails.component.html',
  styleUrls: ['./admin-emails.component.css']
})
export class AdminEmailsComponent implements OnInit {
  private queryParamsSubscription;
  private emailsSubscription;

  private page;
  private subscribed;

  private previousSubscribed;

  private config;

  private emails: Array<Email>;

  constructor(
    private emailService: EmailService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;
        this.subscribed = +params['subscribed'] || 'all';

        this.fetchEmails();
      })
  }

  fetchEmails() {
    let params = new HttpParams();

    if (this.subscribed) {
      if (this.subscribed != 'all') {
        params.append('subscribed', this.subscribed);
        if (this.subscribed != this.previousSubscribed) {
          this.page = 1;
        }
      }
      this.previousSubscribed = this.subscribed;
    }

    params = params.append('sort', 'createdAt-desc');
    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());
  
    this.emailsSubscription = this.emailService.getAllEmails(params)
      .subscribe(
        result => {
          this.config = {
            itemsPerPage: 12,
            currentPage: this.page,
            totalItems: result['count_results']
          };
          this.emails = result['items'];
        }
      )
  }
  
  pageChanged(event) {
    this.config.currentPage = event;
    this.page = event;
    this.fetchEmails();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.emailsSubscription.unsubscribe();
  }
}
