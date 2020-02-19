import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BasicInfoComponent } from "./basic-info.component";
import { ReactiveFormsModule, FormBuilder, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AppModule } from "src/app/app.module";
import { MaterialModule } from "src/app/modules/material/material.module";
import { Utility } from "src/app/shared/utilities/utility";
import { utils } from "protractor";

describe("BasicInfoComponent", () => {
  let component: BasicInfoComponent;
  let fixture: ComponentFixture<BasicInfoComponent>;
  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicInfoComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        AppModule
      ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: Utility, useValue: utils }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoComponent);
    component = fixture.componentInstance;
    // pass in the form dynamically
    component.insuranceForm = formBuilder.group({
      insured_national_id: null,
      sequence_number: null,
      policy_effective_date: null,
      owner_national_id: null,
      custom_number: null
    });

    component.onBasicSubmit();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
