import { SEOService } from './../../../services/seo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  private queryParamsSubscription;

  private email;

  constructor(
    private seoService: SEOService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.seoService.setPageTitle('Activate | DocumentaryWIRE');

    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
          this.email = params['email'];
    });
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }
}
