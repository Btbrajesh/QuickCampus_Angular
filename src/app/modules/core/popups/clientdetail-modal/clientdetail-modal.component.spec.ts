import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientdetailModalComponent } from './clientdetail-modal.component';

describe('ClientdetailModalComponent', () => {
  let component: ClientdetailModalComponent;
  let fixture: ComponentFixture<ClientdetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientdetailModalComponent]
    });
    fixture = TestBed.createComponent(ClientdetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
