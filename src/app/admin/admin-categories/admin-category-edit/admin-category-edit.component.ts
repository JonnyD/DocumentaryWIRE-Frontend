import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { Category } from './../../../models/category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-category-edit',
  templateUrl: './admin-category-edit.component.html',
  styleUrls: ['./admin-category-edit.component.css']
})
export class AdminCategoryEditComponent implements OnInit {
  editCategoryForm: FormGroup;

  category: Category;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.category = <Category> result[0];

      this.initForm();
    })
  }

  initForm() {
    let name = this.category.name;
    let slug = this.category.slug;

    this.editCategoryForm = new FormGroup({
      'name': new FormControl(name, [Validators.required]),
      'slug': new FormControl(slug, [Validators.required]),
    });
  }
  
  onSubmit() {
    let categoryId = this.category.id;
    let formValue = this.editCategoryForm.value;

    this.categoryService.editCategory(categoryId, formValue).subscribe(result => {
      console.log(result);
      this.router.navigate(["/admin/categories", categoryId]);
    });
  }
}
