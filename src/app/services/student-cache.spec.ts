import { TestBed } from '@angular/core/testing';

import { StudentCache } from './student-cache';

describe('StudentCache', () => {
  let service: StudentCache;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentCache);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
