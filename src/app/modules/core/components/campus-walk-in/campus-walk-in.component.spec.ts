import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusWalkInComponent } from './campus-walk-in.component';

describe('CampusWalkInComponent', () => {
  let component: CampusWalkInComponent;
  let fixture: ComponentFixture<CampusWalkInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampusWalkInComponent]
    });
    fixture = TestBed.createComponent(CampusWalkInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
