import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicantComponent } from './add-applicant.component';

describe('AddApplicantComponent', () => {
  let component: AddApplicantComponent;
  let fixture: ComponentFixture<AddApplicantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddApplicantComponent]
    });
    fixture = TestBed.createComponent(AddApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
