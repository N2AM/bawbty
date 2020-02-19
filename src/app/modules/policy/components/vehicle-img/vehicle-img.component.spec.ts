import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleImgComponent } from './vehicle-img.component';

describe('VehicleImgComponent', () => {
  let component: VehicleImgComponent;
  let fixture: ComponentFixture<VehicleImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
