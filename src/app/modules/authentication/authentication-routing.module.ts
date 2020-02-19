import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SmsVerificationComponent } from "./components/sms-verification/sms-verification.component";
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";
import { EmailSentComponent } from "./components/email-sent/email-sent.component";
import { EmailSentGuard } from "src/app/core/guards/email-sent.guard";
import { EmailConfirmedComponent } from "./components/email-confirmed/email-confirmed.component";
import { NotFoundComponent } from "src/app/not-found/not-found.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { SmsVerifyGuard } from "src/app/core/guards/sms-verify.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: { animation: "Login" }
  },
  {
    path: "sign-up",
    component: RegisterComponent,
    data: { animation: "Register" }
  },
  {
    path: "sms-verification",
    component: SmsVerificationComponent,
    canActivate: [SmsVerifyGuard],
    data: { animation: "sms" }
  },
  {
    path: "forget-password",
    component: ForgetPasswordComponent
  },

  {
    path: "reset-password",
    component: ResetPasswordComponent
  },
  {
    path: "check-email",
    component: EmailSentComponent,
    canActivate: [EmailSentGuard],

    data: { animation: "mail" }
  },
  {
    path: "email-confirmed",
    component: EmailConfirmedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
