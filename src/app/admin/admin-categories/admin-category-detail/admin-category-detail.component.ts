import { Status } from './../../../models/status.model';
import { Type } from './../../../models/type.model';
import { VideoSourceService } from './../../../services/video-source.service';
import { DocumentaryService } from './../../../services/documentary.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Documentary } from 'src/app/models/documentary.model';
import { Location } from "@angular/common";
import { VideoSource } from 'src/app/models/video-source.model';

@Component({
  selector: 'app-admin-category-detail',
  templateUrl: './admin-category-detail.component.html',
  styleUrls: ['./admin-category-detail.component.css']
})
export class AdminCategoryDetailComponent implements OnInit {

  private category: Category;

  private config;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.category = <Category>result[0];
    });
  }
}
