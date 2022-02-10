import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollsalesComponent } from './collsales.component';

describe('CollsalesComponent', () => {
  let component: CollsalesComponent;
  let fixture: ComponentFixture<CollsalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollsalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
