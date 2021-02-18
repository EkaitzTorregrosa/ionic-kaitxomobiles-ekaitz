import { TestBed } from '@angular/core/testing';

import { MobilecrudService } from './mobilecrud.service';

describe('MobilecrudService', () => {
  let service: MobilecrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobilecrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
