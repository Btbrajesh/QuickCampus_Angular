import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusdetailModalComponent } from './campusdetail-modal.component';

describe('CampusdetailModalComponent', () => {
  let component: CampusdetailModalComponent;
  let fixture: ComponentFixture<CampusdetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampusdetailModalComponent]
    });
    fixture = TestBed.createComponent(CampusdetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
