import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortedSquaresStageComponent } from './sorted-squares-stage.component';

describe('SortedSquaresStageComponent', () => {
  let component: SortedSquaresStageComponent;
  let fixture: ComponentFixture<SortedSquaresStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortedSquaresStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortedSquaresStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
