import { VideoSource } from './../../models/video-source.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentaryService } from './../../services/documentary.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Documentary } from './../../models/documentary.model';
import { Location } from "@angular/common";

@Component({
  selector: 'app-admin-documentaries',
  templateUrl: './admin-documentaries.component.html',
  styleUrls: ['./admin-documentaries.component.css']
})
export class AdminDocumentariesComponent implements OnInit, OnDestroy {
  
  private documentariesSubscription;
  private queryParamsSubscription;
  public documentaries: Array<Documentary>;
  config: any;
  private page;
  private videoSource;
  private params: HttpParams;

  constructor(
    private service: DocumentaryService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;
        this.videoSource = +params['videoSource'] || null;
        this.fetchDocumentaries(this.page, this.videoSource);
      })
  }

  fetchDocumentaries(page:number = 1, videoSource:number = null) {
    let params = new HttpParams();
    if (videoSource) {
      params = params.append('videoSource', videoSource.toString());
      page = 1;
    }
    params = params.append('page', page.toString());
    //console.log(params);
    
    this.location.go(this.router.url.split("?")[0], params.toString());

    this.documentariesSubscription = this.service.getAllDocumentaries(params)
      .subscribe(
          result => {
            this.config = {
              itemsPerPage: 12,
              currentPage: page,
              totalItems: result['count_results']
            };
            this.documentaries = result['items'];
            console.log(result);
          }
      );
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.fetchDocumentaries(event);
  }

  ngOnDestroy() {
    this.documentariesSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
  }
}
