import { TestBed } from '@angular/core/testing';

import { VacationWeeksService } from './vacation-weeks.service';

describe('VacationWeeksService', () => {
  let service: VacationWeeksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationWeeksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
