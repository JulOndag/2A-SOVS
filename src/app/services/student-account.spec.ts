import { TestBed } from '@angular/core/testing';

import { StudentAccount } from './student-account';

describe('StudentAccount', () => {
  let service: StudentAccount;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAccount);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
