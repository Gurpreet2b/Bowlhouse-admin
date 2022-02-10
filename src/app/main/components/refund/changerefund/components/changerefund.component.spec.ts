import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerefundComponent } from './changerefund.component';

describe('ChangerefundComponent', () => {
  let component: ChangerefundComponent;
  let fixture: ComponentFixture<ChangerefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangerefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangerefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
