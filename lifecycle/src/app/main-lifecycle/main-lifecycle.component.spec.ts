import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLifecycleComponent } from './main-lifecycle.component';

describe('MainLifecycleComponent', () => {
  let component: MainLifecycleComponent;
  let fixture: ComponentFixture<MainLifecycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLifecycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLifecycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
