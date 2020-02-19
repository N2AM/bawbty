import { Component, OnInit } from "@angular/core";
import { Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import { UserInfo } from "src/app/shared/models/user-info.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import * as UserInfoFormActions from "../../../../actions/userInfoForm.action";
import { Driver } from "src/app/shared/models/driver.model";
import { LookupsService } from "src/app/shared/services/lookups.service";
import * as $ from "jquery";
@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss", " ../../../shared.scss"]
})
export class UserInfoComponent implements OnInit {
  drivingPercentage: number[];
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private lookups: LookupsService
  ) {}

  @Output() switchTabs = new EventEmitter<any>();
  userInfoForm: FormGroup;
  maxDate = moment(new Date()).add(-1, "day");
  PolicyMedicalCheck: boolean = false;
  PolicyViolationsCheck: boolean = false;
  noDrivers: boolean = true;
  addDriverCheck: boolean = false;
  addDriversCheck: boolean = false;
  driversView: boolean = false;
  dobInitial;
  eduInitial;
  licenceInitial;
  onEditDriver: Driver;
  userInfoLookUps;
  drivers: any[] = [0];
  formErrShow: boolean = false;
  formErr: string;
  Add: string = "Add driver";
  isBOD: boolean = false;
  selectedLicenseType;
  selectedEducationQualification;
  ngOnInit() {
    this.store.select("userInfoLookups").subscribe((res: any) => {
      if (res && res.License_types && res.License_types.length > 0) {
        this.userInfoLookUps = res;
        // this.selectedLicenseType = this.userInfoLookUps.License_types.find(
        //   s => s.IsDefault == true
        // ).id;
        this.selectedEducationQualification = this.userInfoLookUps.Education_qualification.find(
          s => s.IsDefault == true
        ).Id;
      }
      // console.log(this.selectedEducationQualification);

      this.userInfoForm = this.formBuilder.group({
        // dob: [
        //   { value: this.dobInitial, disabled: true },
        //   [Validators.required]
        // ],
        Education_qualification: [
          this.selectedEducationQualification,
          [Validators.required]
        ],
        children_below_16: ["0", [Validators.required]],
        // license_type: [this.selectedLicenseType, [Validators.required]],
        Traffic_violations: [[], []],
        Medical_conditions: [[], []]
      });
    });
    // this.store.select("userInfo").subscribe((res: UserInfo) => {
    //   if (res) {
    //     console.log(res);

    //     if (res.dateOfBirth !== null || res.dateOfBirth !== "") {
    //       this.dobInitial = moment(new Date(res.dateOfBirth));
    //       console.log(this.dobInitial);
    //       this.userInfoForm.controls["dob"].setValue(this.dobInitial);
    //       this.userInfoForm.updateValueAndValidity();
    //       this.isBOD = true;
    //       console.log(this.dobInitial);
    //     } else {
    //       this.isBOD = false;
    //       console.log(this.dobInitial);
    //     }
    //   }
    // });

    this.store.select("drivingPercentage").subscribe(res => {
      this.drivingPercentage = res;
      this.store.select("driver").subscribe(res => {
        this.drivers = res;
      });
    });
  }
  get f() {
    return this.userInfoForm.controls;
  }
  moveToSelectedTab(e, c, state?) {
    //// console.log(e);
    if (state == "Previous") {
      this.switchTabs.emit({ e, c });
    } else {
      if (this.userInfoForm.valid) {
        this.switchTabs.emit({ e, c });
      }
    }
  }

  PolicyMedical(e) {
    if (e.value == "1") {
      this.PolicyMedicalCheck = true;
      this.userInfoForm.controls["Medical_conditions"].setValidators(
        Validators.required
      );
      this.userInfoForm.controls["Medical_conditions"].updateValueAndValidity();
    } else {
      this.PolicyMedicalCheck = false;
      this.userInfoForm.controls["Medical_conditions"].clearValidators();
      this.userInfoForm.controls["Medical_conditions"].setValue([]);
      this.userInfoForm.controls["Medical_conditions"].updateValueAndValidity();
    }
  }
  violation(e) {
    if (e.value == "1") {
      this.PolicyViolationsCheck = true;
      this.userInfoForm.controls["Traffic_violations"].setValidators(
        Validators.required
      );
      this.userInfoForm.controls["Traffic_violations"].updateValueAndValidity();
    } else {
      this.PolicyViolationsCheck = false;
      this.userInfoForm.controls["Traffic_violations"].clearValidators();
      this.userInfoForm.controls["Traffic_violations"].setValue([]);
      this.userInfoForm.controls["Traffic_violations"].updateValueAndValidity();
    }
  }
  addDriver(e) {
    // console.log("add driver");
    this.addDriverCheck = true;
    this.addDriversCheck = false;
    this.noDrivers = false;
    this.driversView = false;
    this.onEditDriver = null;
    this.Add = "Add driver";
  }
  doneForm(event) {
    // console.log(event, this.drivingPercentage.length);
    this.addDriverCheck = false;
    this.noDrivers = false;
    this.driversView = true;
    if (this.drivingPercentage.length != 0) {
      this.addDriversCheck = true;
    } else {
      this.addDriversCheck = false;
    }
  }
  deleted(e) {
    // console.log(e);
    if (this.drivers.length !== 0) {
      this.addDriversCheck = e;
      this.noDrivers = false;
    } else {
      this.noDrivers = true;
      this.addDriversCheck = false;
    }
  }
  getEditedDriver(e) {
    // console.log("onEdit Driver", e.driver);
    this.onEditDriver = e.driver;
    this.Add = "Edit driver";
    this.addDriverCheck = true;
    this.addDriversCheck = false;
    this.noDrivers = false;
    this.driversView = false;
  }
  addDrivers(event) {
    // console.log("add drivers");
    this.addDriverCheck = true;
    this.onEditDriver = null;
    this.Add = "Add driver";
    this.addDriversCheck = false;
    this.driversView = false;
  }

  hideForm(event) {
    // console.log(this.drivingPercentage.length, this.drivers.length);
    if (this.drivers.length === 0) {
      this.noDrivers = true;
      this.driversView = false;
      this.addDriverCheck = false;
      this.addDriversCheck = false;
    } else if (this.drivers.length > 0 && this.drivingPercentage.length > 0) {
      this.addDriverCheck = false;
      this.addDriversCheck = true;
      this.driversView = true;
      this.noDrivers = false;
    } else if (this.drivers.length > 0 && this.drivingPercentage.length === 0) {
      this.driversView = true;
      this.addDriversCheck = false;
      this.noDrivers = false;
      this.addDriverCheck = false;
    } else {
      this.noDrivers = false;
      this.addDriverCheck = false;
      this.driversView = true;
    }
  }
  getErrorMesg(e) {
    this.formErr = e;
    this.formErrShow = true;
    setTimeout(() => {
      this.formErrShow = false;
    }, 3000);
  }

  getUerInfo() {
    this.submitted = true;
    // scrollIfFormHasErrors(this.userInfoForm).then(() => {
    //   // Run any additional functionality if you need to.
    // });
    if (this.userInfoForm.invalid) {
      $("html, body").animate(
        {
          scrollTop: $(".ng-invalid").offset().top - 150
        },
        1000
      );
    }
    if (this.userInfoForm.valid) {
      //// console.log(this.userInfoForm.value);
      this.store.dispatch(
        new UserInfoFormActions.UpdateUserInfoForm({
          ...this.userInfoForm.value
          // date_of_birth: this.userInfoForm.controls["dob"].value.format(
          //   "DD/MM/YYYY"
          // )
        })
      );
    } else {
      return;
    }
  }
}
