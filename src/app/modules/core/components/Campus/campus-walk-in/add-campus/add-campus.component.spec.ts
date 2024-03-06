import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampusComponent } from './add-campus.component';

describe('AddCampusComponent', () => {
  let component: AddCampusComponent;
  let fixture: ComponentFixture<AddCampusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCampusComponent]
    });
    fixture = TestBed.createComponent(AddCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
