import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoledetailModalComponent } from './roledetail-modal.component';

describe('RoledetailModalComponent', () => {
  let component: RoledetailModalComponent;
  let fixture: ComponentFixture<RoledetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoledetailModalComponent]
    });
    fixture = TestBed.createComponent(RoledetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
