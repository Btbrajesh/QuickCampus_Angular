import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetailModalComponent } from './userdetail-modal.component';

describe('UserdetailModalComponent', () => {
  let component: UserdetailModalComponent;
  let fixture: ComponentFixture<UserdetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserdetailModalComponent]
    });
    fixture = TestBed.createComponent(UserdetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
