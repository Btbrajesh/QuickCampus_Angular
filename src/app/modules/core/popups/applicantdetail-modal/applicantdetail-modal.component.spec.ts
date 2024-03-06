import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantdetailModalComponent } from './applicantdetail-modal.component';

describe('ApplicantdetailModalComponent', () => {
  let component: ApplicantdetailModalComponent;
  let fixture: ComponentFixture<ApplicantdetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantdetailModalComponent]
    });
    fixture = TestBed.createComponent(ApplicantdetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
