import { TestBed } from '@angular/core/testing';

import { ServiCrudClientesService } from './servi-crud-clientes.service';

describe('ServiCrudClientesService', () => {
  let service: ServiCrudClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiCrudClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
