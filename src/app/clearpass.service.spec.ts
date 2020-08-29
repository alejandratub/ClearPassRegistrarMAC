import { TestBed } from '@angular/core/testing';

import { ClearpassService } from './clearpass.service';

describe('ClearpassService', () => {
  let service: ClearpassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearpassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
