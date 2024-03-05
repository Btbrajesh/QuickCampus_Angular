import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApplicantComponent } from './edit-applicant.component';

describe('EditApplicantComponent', () => {
  let component: EditApplicantComponent;
  let fixture: ComponentFixture<EditApplicantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditApplicantComponent]
    });
    fixture = TestBed.createComponent(EditApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
