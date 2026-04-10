import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ballot } from './ballot';

describe('Ballot', () => {
  let component: Ballot;
  let fixture: ComponentFixture<Ballot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ballot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ballot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
