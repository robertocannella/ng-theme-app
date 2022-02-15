import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingChallengesComponent } from './coding-challenges.component';

describe('CodingChallengesComponent', () => {
  let component: CodingChallengesComponent;
  let fixture: ComponentFixture<CodingChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodingChallengesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
