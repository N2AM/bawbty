import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CountdownModule, CountdownGlobalConfig } from "ngx-countdown";

import { PolicyRoutingModule } from "./policy-routing.module";
import { PolicyDetailsComponent } from "./components/policy-details/policy-details.component";
import { PolicyComponent } from "./pages/policy/policy.component";
import { MaterialModule } from "../material/material.module";
import { PaymentCardComponent } from "./pages/payment-card/payment-card.component";
import { ReceiptComponent } from "./pages/receipt/receipt.component";
import { VehicleImgComponent } from "./components/vehicle-img/vehicle-img.component";
import { NgxImageCompressService } from "ngx-image-compress";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaymentFailedComponent } from "./components/payment-failed/payment-failed.component";

export function countdownConfigFactory() {
  return { format: `HH:mm:ss` };
}
@NgModule({
  declarations: [
    PolicyDetailsComponent,
    PolicyComponent,
    PaymentCardComponent,
    ReceiptComponent,
    VehicleImgComponent,
    PaymentFailedComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PolicyRoutingModule,
    CountdownModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory },
    NgxImageCompressService
  ]
})
export class PolicyModule {}
