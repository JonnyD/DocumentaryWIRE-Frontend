import { SEOService } from './../../../services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-not-confirmed',
  templateUrl: './email-not-confirmed.component.html',
  styleUrls: ['./email-not-confirmed.component.css']
})
export class EmailNotConfirmedComponent implements OnInit {

  public email;

  private routeParamsSubscription;

  constructor(
    private seoService: SEOService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeParamsSubscription = this.route.paramMap
      .subscribe(params => {
        console.log("params");
        console.log(params);
        this.email = params['params']['email'];
        
        this.seoService.setPageTitle('Email not Confirmed | DocumentaryWIRE');
      });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
