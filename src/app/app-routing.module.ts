import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { NoAuthGuard } from "./core/guards/no-auth.guard";
import { TestComponent } from "./test/test.component";
import { MainSliderComponent } from "./modules/home/components/main-slider/main-slider.component";
import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: "",
    component: AppComponent
  },
  {
    path: "how-it-works",
    loadChildren: () =>
      import(`./modules/home/home.module`).then(m => m.HomeModule),
    pathMatch: "full"
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(`./modules/dashboard/dashboard.module`).then(
        m => m.DashboardModule
      )
  },
  {
    path: "auth",
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import(`./modules/authentication/authentication.module`).then(
        m => m.AuthenticationModule
      )
  },
  {
    path: "quote",
    loadChildren: () =>
      import(`./modules/get-quotes/get-quotes.module`).then(
        m => m.GetQuotesModule
      )
  },
  {
    path: "quotes",
    loadChildren: () =>
      import(`./modules/quotes/quotes.module`).then(m => m.QuotesModule)
  },
  {
    path: "faq",
    loadChildren: () =>
      import(`./modules/faq/faq.module`).then(m => m.FaqModule)
  },
  {
    path: "policy",

    loadChildren: () =>
      import(`./modules/policy/policy.module`).then(m => m.PolicyModule)
  },
  { path: "404", component: NotFoundComponent },
  { path: "test", component: TestComponent },
  { path: "**", redirectTo: "/404" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
