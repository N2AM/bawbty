import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-policy-holders",
  templateUrl: "./policy-holders.component.html",
  styleUrls: ["./policy-holders.component.scss"]
})
export class PolicyHoldersComponent implements OnInit {
  constructor() {}
  @Input() policyHolders;
  @Output() emitDeletedHolder = new EventEmitter();
  ngOnInit() {}
  deletePolicyHolder(policyHolder) {
    // console.log(policyHolder);
    this.emitDeletedHolder.emit(policyHolder);
  }
}
