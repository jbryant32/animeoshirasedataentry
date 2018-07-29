import { TestBed, inject } from '@angular/core/testing';

import { EditGuardService } from './edit-guard.service';

describe('EditGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditGuardService]
    });
  });

  it('should be created', inject([EditGuardService], (service: EditGuardService) => {
    expect(service).toBeTruthy();
  }));
});
