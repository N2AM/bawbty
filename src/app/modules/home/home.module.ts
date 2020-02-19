import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { LatestNewsComponent } from "./components/latest-news/latest-news.component";
import { HowWorksComponent } from "./components/how-works/how-works.component";
import { HomeComponent } from "./pages/home/home.component";

import { HomeRoutingModule } from "./home-routing.module";
import { Overlay, CloseScrollStrategy } from "@angular/cdk/overlay";
import {
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_DATEPICKER_SCROLL_STRATEGY,
  MatCalendar,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
export function scrollFactory(overlay: Overlay): () => CloseScrollStrategy {
  return () => overlay.scrollStrategies.close();
}
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
    // MainSliderComponent,
    LatestNewsComponent,
    HowWorksComponent,
    HomeComponent
  ],
  imports: [CommonModule, HomeRoutingModule],
  exports: [
    // MainSliderComponent,
    LatestNewsComponent,
    HowWorksComponent,
    HomeComponent
  ],
  providers: [
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

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    }
  ]
})
export class HomeModule {}
