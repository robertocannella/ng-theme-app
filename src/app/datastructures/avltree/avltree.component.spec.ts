import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AVLTreeComponent } from './avltree.component';

describe('AvltreeComponent', () => {
  type NewType = AVLTreeComponent;

  let component: NewType;
  let fixture: ComponentFixture<AVLTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AVLTreeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AVLTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
