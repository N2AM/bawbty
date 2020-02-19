import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { AppModule } from "src/app/app.module";
import { MaterialModule } from "src/app/modules/material/material.module";
import { InsuranceFormsComponent } from "./insurance-forms.component";
import { BasicInfoComponent } from "../../components/basic-info/basic-info.component";
import { VehicleInfoComponent } from "../../components/vehicle-info/vehicle-info.component";
import { UserInfoComponent } from "../../components/user-info/user-info.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

describe("InsuranceFormsComponent", () => {
  let component: InsuranceFormsComponent;
  let fixture: ComponentFixture<InsuranceFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InsuranceFormsComponent,
        UserInfoComponent,
        BasicInfoComponent,
        VehicleInfoComponent
      ],
      imports: [
        CommonModule,
        MaterialModule,
        AppModule,
        ReactiveFormsModule,
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
