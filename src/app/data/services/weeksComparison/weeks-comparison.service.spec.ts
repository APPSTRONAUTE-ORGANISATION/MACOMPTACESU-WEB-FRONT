import { TestBed } from '@angular/core/testing';

import { WeeksComparisonService } from './weeks-comparison.service';

describe('WeeksComparisonService', () => {
  let service: WeeksComparisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeksComparisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
