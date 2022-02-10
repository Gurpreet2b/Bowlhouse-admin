import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminrefundComponent } from './adminrefund.component';

describe('AdminrefundComponent', () => {
  let component: AdminrefundComponent;
  let fixture: ComponentFixture<AdminrefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminrefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminrefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
