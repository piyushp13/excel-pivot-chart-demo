import { TestBed } from '@angular/core/testing';

import { PlanogramService } from './planogram.service';

describe('PlanogramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanogramService = TestBed.get(PlanogramService);
    expect(service).toBeTruthy();
  });
});
