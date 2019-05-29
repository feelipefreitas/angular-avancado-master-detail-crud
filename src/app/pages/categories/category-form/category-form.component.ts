import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new')
      this.createCategory();
    else
      this.updateCategory();
  }

  buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  loadCategory() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap((params: ParamMap) => this.categoryService.getById(+params.get('id')))
      ).subscribe(
        (category: Category) => {
          this.category = category;
          this.categoryForm.patchValue(this.category); //Passa a categoria para o form
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      );
    }
  }

  private updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category).subscribe(
      (updatedCategory: Category) => this.actionsForSuccess(updatedCategory),
      (error) => this.actionsForError(error)
    );
  }

  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.create(category).subscribe(
      (newCategory: Category) => this.actionsForSuccess(newCategory),
      (error) => this.actionsForError(error)
    );
  }

  private actionsForError(error: any): void {
    toastr.error('Ocorreu um erro ao processar sua solicitação!');

    this.submittingForm = false;

    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
  }

  private actionsForSuccess(category: Category): void {
    toastr.success('Solicitação processada com sucesso!');

    this.router.navigateByUrl('categories', { skipLocationChange: true }).then(
      () => this.router.navigate(['categories', category.id, 'edit'])
    );
  }

  private setPageTitle() {
    if (this.currentAction === 'new')
      this.pageTitle = 'Cadastro de Nova Categoria';
    else {
      const categoryName = this.category.name || '';
      this.pageTitle = `Editando Categoria: ${categoryName}`;
    }
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new')
    this.currentAction = 'new';
    else this.currentAction = 'edit';
  }
}
