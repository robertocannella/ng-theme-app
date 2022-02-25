import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxConsecutiveOnesComponent } from './max-consecutive-ones.component';

describe('MaxConsecutiveOnesComponent', () => {
  let component: MaxConsecutiveOnesComponent;
  let fixture: ComponentFixture<MaxConsecutiveOnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxConsecutiveOnesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxConsecutiveOnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
