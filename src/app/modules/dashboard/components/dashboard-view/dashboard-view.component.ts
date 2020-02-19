import { Component, OnInit, Input } from "@angular/core";
import { DashboardService } from "src/app/shared/services/dashboard.service";

@Component({
  selector: "app-dashboard-view",
  templateUrl: "./dashboard-view.component.html",
  styleUrls: ["./dashboard-view.component.scss"]
})
export class DashboardViewComponent implements OnInit {
  constructor() {}
  @Input() policiesCounts;
  ngOnInit() {}
}
