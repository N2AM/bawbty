import { NgModule, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GetQuotesRoutingModule } from "./get-quotes-routing.module";
import { InsuranceFormsComponent } from "./pages/insurance-forms/insurance-forms.component";
import { BasicInfoComponent } from "./components/basic-info/basic-info.component";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { VehicleInfoComponent } from "./components/vehicle-info/vehicle-info.component";
import { MaterialModule } from "../material/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Overlay, CloseScrollStrategy } from "@angular/cdk/overlay";
import {
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_DATEPICKER_SCROLL_STRATEGY,
  MatCalendar,
  MatSelectModule,
  MAT_AUTOCOMPLETE_SCROLL_STRATEGY
} from "@angular/material";
import {
  MomentDateModule,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"; // <-- #2 import module
export function scrollFactory(overlay: Overlay): () => CloseScrollStrategy {
  return () => overlay.scrollStrategies.close();
}
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material";
import { Utility } from "src/app/shared/utilities/utility";
import { DriversComponent } from "./components/drivers/drivers.component";
import { DriverFormComponent } from "./components/driver-form/driver-form.component";
const MY_FORMATS = {
  parse: {
    dateInput: "LL"
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "YYYY"
  }
};

@NgModule({
  declarations: [
    InsuranceFormsComponent,
    BasicInfoComponent,
    UserInfoComponent,
    VehicleInfoComponent,
    DriversComponent,
    DriverFormComponent
  ],
  imports: [
    CommonModule,
    GetQuotesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RxReactiveFormsModule,
    MomentDateModule,
    MatSelectModule
  ],
  providers: [
    Utility,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_SELECT_SCROLL_STRATEGY,
      useFactory: scrollFactory,
      deps: [Overlay]
    },
    {
      provide: MAT_DATEPICKER_SCROLL_STRATEGY,
      useFactory: scrollFactory,
      deps: [Overlay]
    },
    {
      provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
      useFactory: scrollFactory,
      deps: [Overlay]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class GetQuotesModule {}
