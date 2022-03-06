import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatapipesComponent } from './datapipes.component';

describe('DatapipesComponent', () => {
  let component: DatapipesComponent;
  let fixture: ComponentFixture<DatapipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatapipesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatapipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
