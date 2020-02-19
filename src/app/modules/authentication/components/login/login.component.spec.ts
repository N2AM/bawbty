import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { ReactiveFormsModule, FormBuilder, FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/modules/material/material.module";
import { ShowHidePasswordModule } from "ngx-show-hide-password";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ShowHidePasswordModule,
        RouterTestingModule,
        RouterModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.loginForm = formBuilder.group({
      email: null,
      password: null
    });
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
