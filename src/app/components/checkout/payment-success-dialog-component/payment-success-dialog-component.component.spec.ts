import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuccessDialogComponentComponent } from './payment-success-dialog-component.component';

describe('PaymentSuccessDialogComponentComponent', () => {
  let component: PaymentSuccessDialogComponentComponent;
  let fixture: ComponentFixture<PaymentSuccessDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentSuccessDialogComponentComponent]
    });
    fixture = TestBed.createComponent(PaymentSuccessDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
