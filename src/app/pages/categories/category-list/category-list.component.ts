import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category.model';
import { CategoryService } from './../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      (categories: Category[]) => this.categories = categories,
      error => alert('Erro ao carregar a lista')
    );
  }

  deleteCategory(category: Category) {
    const mustDelete = confirm('Deseja mesmo excluir este item?');

    if (!mustDelete) return;

    this.categoryService.delete(category.id).subscribe(
      () => this.categories = this.categories.filter((el: Category) => el !== category)
    );
  }

}
