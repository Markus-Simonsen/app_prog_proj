import { TestBed } from '@angular/core/testing';

import { AShitService } from './ashit-service';

describe('AShitService', () => {
  let service: AShitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AShitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
