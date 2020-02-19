import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompareQuotesComponent } from "./components/compare-quotes/compare-quotes.component";
import { QuotesViewComponent } from "./pages/quotes-view/quotes-view.component";
import { QuoteGuard } from "src/app/core/guards/quote.guard";
import { CompareGuard } from "src/app/core/guards/compare.guard";

const routes: Routes = [
  {
    path: "view",
    component: QuotesViewComponent,
    canActivate: [QuoteGuard]
  },
  {
    path: "compare-quotes",
    component: CompareQuotesComponent,
    canActivate: [CompareGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesRoutingModule {}
