import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCuisinesComponent } from './view-cuisines.component';

describe('ViewCuisinesComponent', () => {
  let component: ViewCuisinesComponent;
  let fixture: ComponentFixture<ViewCuisinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCuisinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCuisinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
