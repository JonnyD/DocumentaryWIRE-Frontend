import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  private categories;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    let params = new HttpParams();
    let authenticate = true;
    let isAdmin = true;
    this.categoryService.getAllCategories(params, authenticate, isAdmin)
      .subscribe(result => {
        this.categories = result;
      })
  }

}
