import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InsuranceFormsComponent } from "./pages/insurance-forms/insurance-forms.component";
import { BasicInfoComponent } from "./components/basic-info/basic-info.component";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { VehicleInfoComponent } from "./components/vehicle-info/vehicle-info.component";
import { NotFoundComponent } from "src/app/not-found/not-found.component";

const routes: Routes = [
  {
    path: "insurance-forms",
    component: InsuranceFormsComponent,
    pathMatch: "full"
  }
  // {
  //   path: "basic-info",
  //   component: BasicInfoComponent,
  //   pathMatch: "full"
  // },
  // {
  //   path: "user-info",
  //   component: UserInfoComponent,
  //   pathMatch: "full"
  // },
  // {
  //   path: "vehicle-info",
  //   component: VehicleInfoComponent,
  //   pathMatch: "full"
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetQuotesRoutingModule {}
