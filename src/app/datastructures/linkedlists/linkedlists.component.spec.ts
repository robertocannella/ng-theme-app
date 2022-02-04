import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedlistsComponent } from './linkedlists.component';

describe('LinkedlistsComponent', () => {
  let component: LinkedlistsComponent;
  let fixture: ComponentFixture<LinkedlistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedlistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
