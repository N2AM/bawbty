import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyHoldersComponent } from './policy-holders.component';

describe('PolicyHoldersComponent', () => {
  let component: PolicyHoldersComponent;
  let fixture: ComponentFixture<PolicyHoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyHoldersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyHoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
