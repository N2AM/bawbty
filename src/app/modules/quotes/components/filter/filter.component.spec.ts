import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterComponent } from "./filter.component";
import { MaterialModule } from "src/app/modules/material/material.module";
import { HttpHandler, HttpClient } from "@angular/common/http";

describe("FilterComponent", () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [MaterialModule],
      providers: [HttpHandler, HttpClient]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    component.getInsuranceAgencies();
    component.getMaintenanceCenter(1);
    component.getInsuranceType(0);
    component.onDeductibleSelection(0, []);
    // component.onAgencySelection(, []);
    component.getQuotesByFilter(2);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
