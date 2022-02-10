import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectedtaxComponent } from './collectedtax.component';

describe('CollectedtaxComponent', () => {
  let component: CollectedtaxComponent;
  let fixture: ComponentFixture<CollectedtaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectedtaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectedtaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
