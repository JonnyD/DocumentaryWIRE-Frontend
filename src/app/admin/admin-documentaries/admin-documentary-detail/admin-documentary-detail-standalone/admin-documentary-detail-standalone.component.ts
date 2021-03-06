import { Status } from './../../../../models/status.model';
import { HttpParams } from '@angular/common/http';
import { CommnentService } from 'src/app/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentaryService } from './../../../../services/documentary.service';
import { Documentary } from './../../../../models/documentary.model';
import { Component, OnInit } from '@angular/core';
import { Comment } from './../../../../models/comment.model';
import { Location } from "@angular/common";

@Component({
  selector: 'app-admin-documentary-detail-standalone',
  templateUrl: './admin-documentary-detail-standalone.component.html',
  styleUrls: ['./admin-documentary-detail-standalone.component.css']
})
export class AdminDocumentaryDetailStandaloneComponent implements OnInit {
  private documentary: Documentary;
  private slug: string;
  private statuses;

  constructor(
    private documentaryService: DocumentaryService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.documentary = <Documentary>result[0];

      this.statuses = this.documentaryService.getStatuses();
    });
  }
}
