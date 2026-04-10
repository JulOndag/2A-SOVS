import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVoters } from './manage-voters';

describe('ManageVoters', () => {
  let component: ManageVoters;
  let fixture: ComponentFixture<ManageVoters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageVoters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVoters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
