import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { DashboardViewComponent } from "./components/dashboard-view/dashboard-view.component";
import { PoliciesComponent } from "./components/policies/policies.component";
import { PolicyHoldersComponent } from "./components/policy-holders/policy-holders.component";
import { VehiclesComponent } from "./components/vehicles/vehicles.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { TabsComponent } from "./components/tabs/tabs.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "settings",
        component: SettingsComponent,
        pathMatch: "full"
      },
      {
        path: "",
        pathMatch: "full",
        component: TabsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
