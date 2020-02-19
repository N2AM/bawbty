import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Driver } from "src/app/shared/models/driver.model";
import { UserInfoComponent } from "../user-info/user-info.component";
import { DriversService } from "src/app/shared/services/drivers.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import * as DriverActions from "../../../../actions/driver.action";
import * as DriverPercentageActions from "../../../../actions/drivingPercentage.action";
@Component({
  selector: "app-drivers",
  templateUrl: "./drivers.component.html",
  styleUrls: ["./drivers.component.scss"]
})
export class DriversComponent implements OnInit {
  @Input() drivers: Driver[];
  @Input() DrivingPercentages;
  editDriver: boolean = false;
  Edit: string = "Edit driver";
  onEditDriver: Driver;
  @Output() editForm = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();
  constructor(
    private userInfo: UserInfoComponent,
    private driverService: DriversService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  delete(driver) {
    this.store.dispatch(
      new DriverActions.RemoveDriver(driver.driver_national_id)
    );
    this.deleted.emit(true);
    this.store.dispatch(
      new DriverPercentageActions.RemoveDrivingPercentage(
        driver.driving_percentage
      )
    );
  }
  editDriverFn(driver) {
    // console.log("start editing");
    this.store.dispatch(
      new DriverPercentageActions.RemoveDrivingPercentage(
        driver.driving_percentage
      )
    );
    this.editForm.emit({ edit: true, driver: driver });
  }
}
