import { TestBed } from '@angular/core/testing';

import { ElecomAccount } from './elecom-account';

describe('ElecomAccount', () => {
  let service: ElecomAccount;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElecomAccount);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
