import { TestBed } from '@angular/core/testing';

import { CurrentBillService } from './current-bill.service';

describe('CurrentBillService', () => {
  let service: CurrentBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
