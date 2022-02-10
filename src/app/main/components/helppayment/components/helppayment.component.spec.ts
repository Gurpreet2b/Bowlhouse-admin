import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelppaymentComponent } from './helppayment.component';

describe('HelppaymentComponent', () => {
  let component: HelppaymentComponent;
  let fixture: ComponentFixture<HelppaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelppaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelppaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
