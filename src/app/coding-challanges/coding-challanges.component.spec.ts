import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingChallangesComponent } from './coding-challanges.component';

describe('CodingChallangesComponent', () => {
  let component: CodingChallangesComponent;
  let fixture: ComponentFixture<CodingChallangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodingChallangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingChallangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
