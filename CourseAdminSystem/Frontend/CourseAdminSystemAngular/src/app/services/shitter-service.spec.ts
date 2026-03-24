import { TestBed } from '@angular/core/testing';

import { ShitterService } from './shitter-service';

describe('ShitterService', () => {
  let service: ShitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
