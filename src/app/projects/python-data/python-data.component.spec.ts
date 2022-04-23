import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonDataComponent } from './python-data.component';

describe('PythonDataComponent', () => {
  let component: PythonDataComponent;
  let fixture: ComponentFixture<PythonDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PythonDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PythonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
