import { Component, OnInit, Input } from "@angular/core";
import { PoliciesService } from "src/app/shared/services/policies.service";
import { MatSelectionListChange } from "@angular/material";

@Component({
  selector: "app-policies",
  templateUrl: "./policies.component.html",
  styleUrls: ["./policies.component.scss"]
})
export class PoliciesComponent implements OnInit {
  constructor(private policiesService: PoliciesService) {}
  @Input() policies;
  currentPage = 1;
  @Input() totalItems;
  status = "";
  ngOnInit() {}
  onScroll() {
    console.log(this.policies.length, this.totalItems);
    if (this.policies.length < this.totalItems) {
      this.currentPage++;
      this.policiesService
        .getPoliciesByFilter(this.currentPage, this.status)
        .subscribe(res => {
          console.log(res);
          this.policies = [...this.policies, ...res.data.Policies];
        });
    }
  }
  filter(event: MatSelectionListChange) {
    console.log(event);
    this.status = event.option.value;
    this.currentPage = 1;
    if (event.option.value == "") {
      this.policies = [];
      this.policiesService
        .getPoliciesByFilter(this.currentPage, event.option.value)
        .subscribe(res => {
          console.log(res);
          this.policies = res.data.Policies;
        });
    }
    if (event.option.value == 4) {
      this.policiesService
        .getPoliciesByFilter(this.currentPage, 4)
        .subscribe(res => {
          console.log(res);
          this.policies = res.data.Policies;
        });
    }
    if (event.option.value == 6) {
      this.policiesService
        .getPoliciesByFilter(this.currentPage, 6)
        .subscribe(res => {
          console.log(res);
          this.policies = res.data.Policies;
        });
    }
    if (event.option.value == 9) {
      this.policiesService
        .getPoliciesByFilter(this.currentPage, 9)
        .subscribe(res => {
          console.log(res);
          this.policies = res.data.Policies;
        });
    }
  }
}
