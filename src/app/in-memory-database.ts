import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories = [
      { id: 1, name: 'Moradia', description: 'Pagamentos de Contas da casa' },
      { id: 2, name: 'Saúde', description: 'Plano de saude e remedios' },
      { id: 3, name: 'Lazer', description: 'Cinema, parques' },
      { id: 4, name: 'Salario', description: 'Recebimentos de salario' },
      { id: 5, name: 'Freelas', description: 'Trabalhos como freelancer' },
    ];

    return { categories };
  }

}


