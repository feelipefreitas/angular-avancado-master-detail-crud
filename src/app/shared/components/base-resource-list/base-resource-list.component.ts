import { OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(private resourceService: BaseResourceService<T>) { }

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      (resources: T[]) => this.resources = resources,
      error => alert('Erro ao carregar a lista')
    );
  }

  deleteCategory(resource: T) {
    const mustDelete = confirm('Deseja mesmo excluir este item?');

    if (!mustDelete) return;

    this.resourceService.delete(resource.id).subscribe(
      () => this.resources = this.resources.filter((el: T) => el !== resource)
    );
  }

}
