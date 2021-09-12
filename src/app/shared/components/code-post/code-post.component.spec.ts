import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePostComponent } from './code-post.component';

describe('CodePostComponent', () => {
  let component: CodePostComponent;
  let fixture: ComponentFixture<CodePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
