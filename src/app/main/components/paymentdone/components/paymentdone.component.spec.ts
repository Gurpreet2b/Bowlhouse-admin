import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentdoneComponent } from './paymentdone.component';

describe('PaymentdoneComponent', () => {
  let component: PaymentdoneComponent;
  let fixture: ComponentFixture<PaymentdoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentdoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentdoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
