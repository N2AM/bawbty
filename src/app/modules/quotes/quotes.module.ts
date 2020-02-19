import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { QuotesRoutingModule } from "./quotes-routing.module";
import { QuotesViewComponent } from "./pages/quotes-view/quotes-view.component";
import { QuoteViewComponent } from "./components/quote-view/quote-view.component";
import { MaterialModule } from "../material/material.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { CompareQuotesComponent } from "./components/compare-quotes/compare-quotes.component";
import { FilterComponent } from "./components/filter/filter.component";
import { ComparedItemsComponent } from "./components/compared-items/compared-items.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CountdownModule, CountdownGlobalConfig } from "ngx-countdown";
import { Overlay, CloseScrollStrategy } from "@angular/cdk/overlay";
import { MAT_SELECT_SCROLL_STRATEGY } from "@angular/material";

export function countdownConfigFactory() {
  return { format: `HH:mm:ss` };
}
export function scrollFactory(overlay: Overlay): () => CloseScrollStrategy {
  return () => overlay.scrollStrategies.close();
}
@NgModule({
  declarations: [
    QuotesViewComponent,
    QuoteViewComponent,
    CompareQuotesComponent,
    FilterComponent,
    ComparedItemsComponent
  ],
  imports: [
    CommonModule,
    QuotesRoutingModule,
    MaterialModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    CountdownModule
  ],
  providers: [
    { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory },
    {
      provide: MAT_SELECT_SCROLL_STRATEGY,
      useFactory: scrollFactory,
      deps: [Overlay]
    }
  ]
})
export class QuotesModule {}
