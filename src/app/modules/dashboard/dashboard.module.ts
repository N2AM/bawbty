import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { DashboardViewComponent } from "./components/dashboard-view/dashboard-view.component";
import { PoliciesComponent } from "./components/policies/policies.component";
import { PolicyHoldersComponent } from "./components/policy-holders/policy-holders.component";
import { VehiclesComponent } from "./components/vehicles/vehicles.component";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { MaterialModule } from "../material/material.module";
import { SettingsComponent } from "./pages/settings/settings.component";
import { NotificationComponent } from "./components/notification/notification.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { TabsComponent } from "./components/tabs/tabs.component";
import { ShowHidePasswordModule } from "ngx-show-hide-password";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardViewComponent,
    PoliciesComponent,
    PolicyHoldersComponent,
    VehiclesComponent,
    SideMenuComponent,
    SettingsComponent,
    NotificationComponent,
    ChangePasswordComponent,
    TabsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ShowHidePasswordModule,
    RxReactiveFormsModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule
  ]
})
export class DashboardModule {}
