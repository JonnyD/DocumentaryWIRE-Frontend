import { DocumentaryService } from './../../../services/documentary.service';
import { Documentary } from './../../../models/documentary.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-documentary-detail',
  templateUrl: './admin-documentary-detail.component.html',
  styleUrls: ['./admin-documentary-detail.component.css']
})
export class AdminDocumentaryDetailComponent implements OnInit, OnDestroy {
  documentary: Documentary;
  slug: string;
  documentarySubscription: Subscription;

  constructor(
    private documentaryService: DocumentaryService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.slug = params['slug'];
          console.log(this.slug);
          this.documentarySubscription = this.documentaryService.get({ slug: this.slug })
            .subscribe(
              result => {
                this.documentary = result;
              }
            );
          }
        );
    }

    ngOnDestroy() {
      this.documentarySubscription.unsubscribe();
    }
}
