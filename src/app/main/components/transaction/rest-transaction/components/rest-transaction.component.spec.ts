import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestTransactionComponent } from './rest-transaction.component';

describe('RestTransactionComponent', () => {
  let component: RestTransactionComponent;
  let fixture: ComponentFixture<RestTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
