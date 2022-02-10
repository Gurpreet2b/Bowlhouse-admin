import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectiveComponent } from './collective.component';

describe('CollectiveComponent', () => {
  let component: CollectiveComponent;
  let fixture: ComponentFixture<CollectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
