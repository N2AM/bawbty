import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RegisterComponent } from "./register.component";
import { ReactiveFormsModule, FormBuilder, FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/modules/material/material.module";
import { ShowHidePasswordModule } from "ngx-show-hide-password";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ShowHidePasswordModule,
        RouterModule,
        RouterTestingModule
      ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.RegisterationForm = formBuilder.group({
      fullName: null,
      email: null,
      password: null,
      phoneNumber: null
    });
    // component.patternValidator(/[a-z]/, event);
    // component.checkMail()
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
