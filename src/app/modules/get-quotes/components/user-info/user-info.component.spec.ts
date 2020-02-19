import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormBuilder, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AppModule } from "src/app/app.module";
import { UserInfoComponent } from "./user-info.component";
import { MaterialModule } from "src/app/modules/material/material.module";

describe("UserInfoComponent", () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        AppModule
      ],
      providers: [{ provide: FormBuilder, useValue: formBuilder }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    component.userInfoForm = formBuilder.group({
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
