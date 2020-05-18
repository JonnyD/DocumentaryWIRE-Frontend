import { SEOService } from './../../services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { DurationService } from './../../services/duration.service';
import { CategoryService } from './../../services/category.service';
import { YearService } from './../../services/year.service';
import { ActivityService } from './../../services/activity.service';
import { UserService } from './../../services/user.service';
import { DocumentaryService } from './../../services/documentary.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {PopoverModule} from 'ngx-smart-popover';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public newestUsers;
  public activeUsers;

  constructor(
    private sanitizer: DomSanitizer,
    private seoService: SEOService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.seoService.setPageTitle('Watch Documentaires Online | DocumentaryWIRE');
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
