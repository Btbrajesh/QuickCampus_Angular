import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegedetailModalComponent } from './collegedetail-modal.component';

describe('CollegedetailModalComponent', () => {
  let component: CollegedetailModalComponent;
  let fixture: ComponentFixture<CollegedetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegedetailModalComponent]
    });
    fixture = TestBed.createComponent(CollegedetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
