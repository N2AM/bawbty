import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparedItemsComponent } from './compared-items.component';

describe('ComparedItemsComponent', () => {
  let component: ComparedItemsComponent;
  let fixture: ComponentFixture<ComparedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
