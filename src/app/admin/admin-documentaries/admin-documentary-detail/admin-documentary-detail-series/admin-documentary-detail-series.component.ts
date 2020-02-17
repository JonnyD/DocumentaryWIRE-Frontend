import { ActivatedRoute, Router } from '@angular/router';
import { DocumentaryService } from './../../../../services/documentary.service';
import { Documentary } from './../../../../models/documentary.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-documentary-detail-series',
  templateUrl: './admin-documentary-detail-series.component.html',
  styleUrls: ['./admin-documentary-detail-series.component.css']
})
export class AdminDocumentaryDetailSeriesComponent implements OnInit {
  documentary: Documentary;
  slug: string;

  constructor(
    private documentaryService: DocumentaryService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log("Here");
    this.route.data.subscribe(result => {
        this.documentary = <Documentary> result[0];
        console.log("this.documentary");
        console.log(this.documentary);
    })
  }
}