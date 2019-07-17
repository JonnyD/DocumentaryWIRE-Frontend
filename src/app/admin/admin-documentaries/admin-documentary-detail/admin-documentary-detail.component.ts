import { DocumentaryService } from './../../../services/documentary.service';
import { Documentary } from './../../../models/documentary.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-documentary-detail',
  templateUrl: './admin-documentary-detail.component.html',
  styleUrls: ['./admin-documentary-detail.component.css']
})
export class AdminDocumentaryDetailComponent implements OnInit, OnDestroy {
  documentary: any;
  slug: string;
  documentarySubscription: Subscription;

  constructor(
    private documentaryService: DocumentaryService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.documentary = data[0];
    })
  }

    ngOnDestroy() {
      this.documentarySubscription.unsubscribe();
    }
}
