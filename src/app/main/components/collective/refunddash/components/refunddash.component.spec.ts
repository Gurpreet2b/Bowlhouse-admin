import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefunddashComponent } from './refunddash.component';

describe('RefunddashComponent', () => {
  let component: RefunddashComponent;
  let fixture: ComponentFixture<RefunddashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefunddashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefunddashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
