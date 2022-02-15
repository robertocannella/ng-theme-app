import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortedSquaresComponent } from './sorted-squares.component';

describe('SortedSquaresComponent', () => {
  let component: SortedSquaresComponent;
  let fixture: ComponentFixture<SortedSquaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortedSquaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortedSquaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
