import { OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(private resourceService: BaseResourceService<T>) { }

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      (resources: T[]) => this.resources = resources,
      error => alert('Erro ao carregar a lista')
    );
  }

  protected deleteResource(resource: T) {
    const mustDelete = confirm('Deseja mesmo excluir este item?');

    if (!mustDelete) return;

    this.resourceService.delete(resource.id).subscribe(
      () => this.resources = this.resources.filter((el: T) => el !== resource)
    );
  }

}
