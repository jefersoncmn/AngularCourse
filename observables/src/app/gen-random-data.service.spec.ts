import { TestBed } from '@angular/core/testing';

import { GenRandomDataService } from './gen-random-data.service';

describe('GenRandomDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenRandomDataService = TestBed.get(GenRandomDataService);
    expect(service).toBeTruthy();
  });
});
