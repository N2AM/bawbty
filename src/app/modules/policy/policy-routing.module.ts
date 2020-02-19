import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PolicyGuard } from "src/app/core/guards/policy.guard";
import { PolicyComponent } from "./pages/policy/policy.component";
import { PaymentCardComponent } from "./pages/payment-card/payment-card.component";
import { ReceiptComponent } from "./pages/receipt/receipt.component";
import { PaymentFailedComponent } from "./components/payment-failed/payment-failed.component";

const routes: Routes = [
  {
    path: "policy-details",
    component: PolicyComponent,
    pathMatch: "full",
    canActivate: [PolicyGuard]
  },
  {
    path: "policy-summary",
    component: PaymentCardComponent
  },
  {
    path: "policy-receipt",
    component: ReceiptComponent
  },
  {
    path: "failed-payment",
    component: PaymentFailedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule {}
