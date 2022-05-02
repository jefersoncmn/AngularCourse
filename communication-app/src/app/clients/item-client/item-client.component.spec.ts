import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemClientComponent } from './item-client.component';

describe('ItemClientComponent', () => {
  let component: ItemClientComponent;
  let fixture: ComponentFixture<ItemClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
