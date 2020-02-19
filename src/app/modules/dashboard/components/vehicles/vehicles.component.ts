import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-vehicles",
  templateUrl: "./vehicles.component.html",
  styleUrls: ["./vehicles.component.scss"]
})
export class VehiclesComponent implements OnInit {
  constructor() {}
  @Input() vehicles;
  @Output() emitDeletedVehicle = new EventEmitter();
  ngOnInit() {}
  deleteVehicle(vehicle) {
    this.emitDeletedVehicle.emit(vehicle);
  }
}
