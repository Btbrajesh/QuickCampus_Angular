import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampusComponent } from './edit-campus.component';

describe('EditCampusComponent', () => {
  let component: EditCampusComponent;
  let fixture: ComponentFixture<EditCampusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCampusComponent]
    });
    fixture = TestBed.createComponent(EditCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
