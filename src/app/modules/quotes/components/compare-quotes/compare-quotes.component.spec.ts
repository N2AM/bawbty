import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareQuotesComponent } from './compare-quotes.component';

describe('CompareQuotesComponent', () => {
  let component: CompareQuotesComponent;
  let fixture: ComponentFixture<CompareQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
