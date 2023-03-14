import { TestBed } from '@angular/core/testing';

import { ServiClientesService } from './servi-clientesColombia.service';

describe('ServiClientesService', () => {
  let service: ServiClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
