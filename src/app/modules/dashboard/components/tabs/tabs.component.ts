import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { PolicyholdersService } from "src/app/shared/services/policyholders.service";
import { VehiclesService } from "src/app/shared/services/vehicles.service";
import { PoliciesService } from "src/app/shared/services/policies.service";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private dashboardService: DashboardService,
    private policyHoldersService: PolicyholdersService,
    private vehiclesService: VehiclesService,
    private policiesService: PoliciesService
  ) {}
  policyHolder;
  policyHolders;
  policiesCounts;
  vehicles;
  vehicle;
  policies;
  totalItems;
  ngOnInit() {
    this.dashboardService.getDashboard().subscribe(res => {
      console.log(res);
      this.policiesCounts = res.data;
    });
  }
  ngAfterViewInit(): void {
    document
      .getElementsByClassName("mat-tab-header")[0]
      .classList.add("mx-5", "px-5");
    (<HTMLElement>document.querySelector(".mat-tab-header")).style.border =
      "none";
  }
  getDeletedHolder(e) {
    console.log(e);
    this.policyHolder = e;
  }
  changeTabs(e) {
    console.log(e);

    if (e.index === 1) {
      this.policiesService.getPolicies(1).subscribe(res => {
        console.log(res);
        this.policies = res.data.Policies;
        this.totalItems = res.data.total_items;
      });
    }

    if (e.index === 2) {
      this.policyHoldersService.getPolicyholders().subscribe(res => {
        console.log(res);
        this.policyHolders = res.Data.policyHolders;
      });
    }
    if (e.index === 3) {
      this.vehiclesService.getVehicles().subscribe(res => {
        console.log(res);
        this.vehicles = res.Data.vehicles;
      });
    }
  }

  deletePolicyHolder(policyHolder) {
    console.log(policyHolder);
    this.policyHoldersService
      .deletePolicyholders(policyHolder.Code)
      .subscribe(res => {
        console.log(res);
        this.policyHolders = this.policyHolders.filter(
          s => s.Code !== policyHolder.Code
        );
      });
  }
  getDeletedVehicle(e) {
    this.vehicle = e;
  }
  deleteVehicle(vehicle) {
    this.vehiclesService.deleteVehicles(vehicle.Code).subscribe(res => {
      console.log(res);
      this.vehicles = this.vehicles.filter(s => s.Code !== vehicle.Code);
    });
  }
}
