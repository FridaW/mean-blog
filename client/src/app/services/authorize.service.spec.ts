import { TestBed, inject } from '@angular/core/testing';

import { AuthorizeService } from './authorize.service';

describe('AuthorizeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizeService]
    });
  });

  it('should be created', inject([AuthorizeService], (service: AuthorizeService) => {
    expect(service).toBeTruthy();
  }));
});
