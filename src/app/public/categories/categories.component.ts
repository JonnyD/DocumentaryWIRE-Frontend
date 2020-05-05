import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private categories;
  
  private categoriesSubscription;
  
  private isFetchingCategories = false;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.isFetchingCategories = true;

    this.categoriesSubscription = this.categoryService.getAllCategories(new HttpParams)
      .subscribe(result => {
        this.categories = this.categoryService.getColumnsForCategories(result);

        this.isFetchingCategories = false;
      })
  }

  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
  }
}
