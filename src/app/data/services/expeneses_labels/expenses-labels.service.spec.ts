import { TestBed } from '@angular/core/testing';

import { ExpensesLabelsService } from './expenses-labels.service';

describe('ExpensesLabelsService', () => {
  let service: ExpensesLabelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesLabelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
