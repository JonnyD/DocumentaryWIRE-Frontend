import { DocumentaryService } from './../../services/documentary.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Documentary } from './../../models/documentary.model';

@Component({
  selector: 'app-admin-documentaries',
  templateUrl: './admin-documentaries.component.html',
  styleUrls: ['./admin-documentaries.component.css']
})
export class AdminDocumentariesComponent implements OnInit, OnDestroy {
  
  private documentariesSubscription;
  public documentaries: Array<any>;
  config: any;

  constructor(private service: DocumentaryService) { }

  ngOnInit() {
    this.fetchDocumentaries();
  }

  fetchDocumentaries(page:number = 1) {
    let params = new HttpParams();
    params = params.append('page', page.toString());

    this.documentariesSubscription = this.service.getAll(params)
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
  }
}
