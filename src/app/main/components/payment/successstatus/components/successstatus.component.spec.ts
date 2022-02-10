import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessstatusComponent } from './successstatus.component';

describe('SuccessstatusComponent', () => {
  let component: SuccessstatusComponent;
  let fixture: ComponentFixture<SuccessstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
