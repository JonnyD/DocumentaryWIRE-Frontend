import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css']
})
export class AdminContactComponent implements OnInit {

  private page;

  private contacts;

  private config;

  private queryParamsSubscription;
  private contactsSubscription;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;

        this.fetchContacts();
      })
  }

  fetchContacts() {
    let params = new HttpParams();

    params = params.append('page', this.page);

    this.location.go(this.router.url.split("?")[0], params.toString());

    this.contactsSubscription = this.contactService.getAllContacts(params)
      .subscribe(
        result => {
          this.config = {
            itemsPerPage: 12,
            currentPage: this.page,
            totalItems: result['count_results']
          };
          this.contacts = result['items'];
        }
      )
  }
  
  pageChanged(event) {
    this.config.currentPage = event;
    this.page = event;
    this.fetchContacts();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.contactsSubscription.unsubscribe();
  }
}
