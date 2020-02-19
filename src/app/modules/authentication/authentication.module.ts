import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { RegisterComponent } from "./components/register/register.component";
import { ShowHidePasswordModule } from "ngx-show-hide-password";
import { SmsVerificationComponent } from "./components/sms-verification/sms-verification.component";
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";
import { EmailSentComponent } from "./components/email-sent/email-sent.component";
import { EmailConfirmedComponent } from "./components/email-confirmed/email-confirmed.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"; // <-- #2 import module
import { CountdownGlobalConfig, CountdownModule } from "ngx-countdown";
export function countdownConfigFactory() {
  return { format: `ss` };
}
@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    SmsVerificationComponent,
    ForgetPasswordComponent,
    EmailSentComponent,
    EmailConfirmedComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ShowHidePasswordModule,
    RxReactiveFormsModule,
    CountdownModule
  ],
  providers: [
    { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }
  ]
})
export class AuthenticationModule {}
