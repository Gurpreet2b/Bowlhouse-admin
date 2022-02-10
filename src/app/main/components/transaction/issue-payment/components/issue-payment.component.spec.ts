import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuePaymentComponent } from './issue-payment.component';

describe('IssuePaymentComponent', () => {
  let component: IssuePaymentComponent;
  let fixture: ComponentFixture<IssuePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
