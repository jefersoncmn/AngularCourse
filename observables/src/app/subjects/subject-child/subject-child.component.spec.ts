import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectChildComponent } from './subject-child.component';

describe('SubjectChildComponent', () => {
  let component: SubjectChildComponent;
  let fixture: ComponentFixture<SubjectChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
