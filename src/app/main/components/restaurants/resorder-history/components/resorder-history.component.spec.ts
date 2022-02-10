import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResorderHistoryComponent } from './resorder-history.component';

describe('ResorderHistoryComponent', () => {
  let component: ResorderHistoryComponent;
  let fixture: ComponentFixture<ResorderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResorderHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResorderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
