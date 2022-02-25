import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxConsecutiveOnesStageComponent } from './max-consecutive-ones-stage.component';

describe('MaxConsecutiveOnesStageComponent', () => {
  let component: MaxConsecutiveOnesStageComponent;
  let fixture: ComponentFixture<MaxConsecutiveOnesStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxConsecutiveOnesStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxConsecutiveOnesStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
