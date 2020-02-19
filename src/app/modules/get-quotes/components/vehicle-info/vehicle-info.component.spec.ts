import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { AppModule } from "src/app/app.module";
import { MaterialModule } from "src/app/modules/material/material.module";
import { VehicleInfoComponent } from "./vehicle-info.component";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

describe("VehicleInfoComponent", () => {
  let component: VehicleInfoComponent;
  let fixture: ComponentFixture<VehicleInfoComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleInfoComponent],
      imports: [CommonModule, AppModule, MaterialModule, ReactiveFormsModule],
      providers: [{ provide: FormBuilder, useValue: formBuilder }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInfoComponent);
    component = fixture.componentInstance;
    component.vehicleInfoForm = formBuilder.group({
      dob: null,
      Education_qualification: null,
      children_below_16: null,
      license_type: null,
      Traffic_violations: null,
      Medical_conditions: null
    });
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
