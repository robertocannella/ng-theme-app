import { TestBed } from '@angular/core/testing';

import { DatapipesService } from './datapipes.service';

describe('DatapipesService', () => {
  let service: DatapipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatapipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
