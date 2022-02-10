import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashordersComponent } from './dashorders.component';

describe('DashordersComponent', () => {
  let component: DashordersComponent;
  let fixture: ComponentFixture<DashordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
