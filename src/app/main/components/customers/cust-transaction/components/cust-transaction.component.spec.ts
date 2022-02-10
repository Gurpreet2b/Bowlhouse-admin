import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustTransactionComponent } from './cust-transaction.component';

describe('CustTransactionComponent', () => {
  let component: CustTransactionComponent;
  let fixture: ComponentFixture<CustTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
