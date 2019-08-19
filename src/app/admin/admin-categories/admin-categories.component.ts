import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

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
    this.categoryService.getAllCategories()
      .subscribe(result => {
        this.categories = result;
      })
  }

}
