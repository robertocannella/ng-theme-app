import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateZerosComponent } from './duplicate-zeros.component';

describe('DuplicateZerosComponent', () => {
  let component: DuplicateZerosComponent;
  let fixture: ComponentFixture<DuplicateZerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicateZerosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateZerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
