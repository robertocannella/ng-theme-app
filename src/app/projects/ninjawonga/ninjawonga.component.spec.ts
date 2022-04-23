import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinjawongaComponent } from './ninjawonga.component';

describe('NinjawongaComponent', () => {
  let component: NinjawongaComponent;
  let fixture: ComponentFixture<NinjawongaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinjawongaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NinjawongaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
