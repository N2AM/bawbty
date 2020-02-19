import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import * as $ from "jquery";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import * as DriversAcions from "../../../../actions/driver.action";
import * as DrivingPercentageAction from "../../../../actions/drivingPercentage.action";
import { DriversService } from "src/app/shared/services/drivers.service";
import { NotEqualValidator } from "src/app/core/validators/not-equal.validator";
import { Driver } from "src/app/shared/models/driver.model";
import { MatSelectChange } from "@angular/material";
import { AlreadyInsertedValidator } from "src/app/core/validators/alreadyInserted.validator";
import { scrollIfFormHasErrors } from "src/app/shared/utilities/validation-scroll";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: "app-driver-form",
  templateUrl: "./driver-form.component.html",
  styleUrls: ["./driver-form.component.scss", " ../../../shared.scss"]
})
export class DriverFormComponent implements OnInit {
  @Input() operation: string;
  @Input() editDriver: Driver;
  @Output() cancelForm = new EventEmitter<any>();
  @Output() doneForm = new EventEmitter<any>();
  @Output() formError = new EventEmitter<any>();
  DriverForm: FormGroup;
  enHijri = [
    { key: "1", value: "Muharram" },
    { key: "2", value: "Safar" },
    { key: "3", value: "Rabi al-Awwal" },
    { key: "4", value: "Rabi al-Thani" },
    { key: "5", value: "Jumada al-Ula" },
    { key: "6", value: "Jumada al-Akhirah" },
    { key: "7", value: "Rajab" },
    { key: "8", value: "Sha'ban" },
    { key: "9", value: "Ramadan" },
    { key: "10", value: "Shawwal" },
    { key: "11", value: "Zulqiddah" },
    { key: "12", value: "Zulhijjah" }
  ];
  arHijri = [
    { key: "1", value: "المحرّم" },
    { key: "2", value: "صفر" },
    { key: "3", value: "ربيع الأول" },
    { key: "4", value: "ربيع الآخر" },
    { key: "5", value: "جمادى الأولى" },
    { key: "6", value: "جمادى الآخرة" },
    { key: "7", value: "رجب" },
    { key: "8", value: "شعبان" },
    { key: "9", value: "رمضان" },
    { key: "10", value: "شوال" },
    { key: "11", value: "ذو القعدة" },
    { key: "12", value: "ذو الحجة" }
  ];
  enGre = [
    { key: "1", value: "January" },
    { key: "2", value: "February" },
    { key: "3", value: "March" },
    { key: "4", value: "April" },
    { key: "5", value: "May" },
    { key: "6", value: "June" },
    { key: "7", value: "July" },
    { key: "8", value: "August" },
    { key: "9", value: "Septemper" },
    { key: "10", value: "October" },
    { key: "11", value: "November" },
    { key: "12", value: "December" }
  ];
  arGer = [
    { key: "1", value: "يناير" },
    { key: "2", value: "فبراير" },
    { key: "3", value: "مارس" },
    { key: "4", value: "إبريل" },
    { key: "5", value: "مايو" },
    { key: "6", value: "يونيو" },
    { key: "7", value: "يوليو" },
    { key: "8", value: "اغسطس" },
    { key: "9", value: "سبتمبر" },
    { key: "10", value: "أكتوبر" },
    { key: "11", value: "نوفمبر" },
    { key: "12", value: "ديسمبر" }
  ];
  driverDetails;
  basicInfo;
  userInfoLookUps;
  show: boolean = true;
  allowSubmit: boolean = true;
  backvalidation: boolean = false;
  maxDate = moment(new Date()).add(-18, "years");
  driverMedicalCheck: boolean = false;
  DrivingPercentages;
  DrivingPercentage;
  driverViolationsCheck: boolean = false;
  submitted: boolean = false;
  driverMedicalCh;
  drivers: Driver[];
  hijri: boolean = true;
  Gregorian: boolean = false;
  birthMonth;
  birthYear;
  years = [];
  hijriYears = [];
  gerYears = [];
  months = [];
  lang = "en";
  manfactureYears = [];
  filteredOptions: Observable<any>;
  filteredMonth: Observable<any>;
  constructor(
    private store: Store<AppState>,
    private driverService: DriversService,
    private formBuilder: FormBuilder
  ) {
    for (let i = 1425; i >= 1325; i--) {
      this.hijriYears.push(i);
      this.years.push(i);
    }
    for (let i = 2003; i >= 1900; i--) {
      this.gerYears.push(i);
    }
  }

  ngOnInit() {
    this.store.select("basicInfo").subscribe(res => {
      this.basicInfo = res;
      // console.log(res);
    });
    this.store.select("userInfoLookups").subscribe(res => {
      this.userInfoLookUps = res;
    });
    this.store.select("drivingPercentage").subscribe(res => {
      // console.log(res);
      this.DrivingPercentages = res;
      // this.basicInfo.owner_national_id
      this.DriverForm = this.formBuilder.group({
        driver_national_id: [
          "",
          [
            Validators.required,
            Validators.pattern("^[1,2][0-9]*$"),
            Validators.min(1000000000),
            Validators.max(9999999999),
            NotEqualValidator.notEqualValues(this.basicInfo.insured_national_id)
          ]
        ],
        birthMonth: ["", [Validators.required]],
        birthYear: [
          "",
          [
            Validators.required
            // Validators.max(this.years[0]),
            // Validators.min(this.years[this.years.length - 1])
          ]
        ],
        Education_qualification: [
          this.userInfoLookUps.Education_qualification.find(
            s => s.IsDefault == true
          ).Id,
          [Validators.required]
        ],
        children_below_16: ["0", [Validators.required]],
        Traffic_violations: [[]],
        Medical_conditions: [[]],
        driving_percentage: ["", [Validators.required]],
        driverViolation: ["2"],
        driverMedical: ["2"]
      });
      if (this.editDriver && this.operation === "Edit driver") {
        // console.log(this.DriverForm.controls["driverMedical"].value);
        if (this.DriverForm.controls["driverMedical"].value === "1") {
          this.driverMedicalCheck = true;
        }
        if (this.DriverForm.controls["driverViolation"].value === "1") {
          this.driverViolationsCheck = true;
        }
        this.DriverForm.setValue({
          driver_national_id: +this.editDriver.driver_national_id,
          birthMonth: this.editDriver.birthMonth,
          birthYear: this.editDriver.birthYear,
          Education_qualification: this.editDriver.Education_qualification,
          children_below_16: this.editDriver.children_below_16,
          Traffic_violations: this.editDriver.Traffic_violations,
          driving_percentage: this.editDriver.driving_percentage,
          Medical_conditions: this.editDriver.Medical_conditions,
          driverViolation:
            this.editDriver.Traffic_violations.length > 0 ? "1" : "2",
          driverMedical:
            this.editDriver.Medical_conditions.length > 0 ? "1" : "2"
        });
        if (this.editDriver.Medical_conditions.length > 0) {
          this.driverMedicalCheck = true;
        }
        if (this.editDriver.Traffic_violations.length > 0) {
          this.driverViolationsCheck = true;
        }
        this.DriverForm.updateValueAndValidity();
      }
    });
    this.store.select("driver").subscribe((res: Driver[]) => {
      console.log(res);
      this.drivers = res;
      if (this.drivers.length > 0) {
        if (this.editDriver && this.operation === "Edit driver") {
          this.drivers = this.drivers.filter(
            d => d.driver_national_id !== this.editDriver.driver_national_id
          );
        }
        this.DriverForm.controls["driver_national_id"].setValidators([
          Validators.required,
          Validators.pattern("^[1,2][0-9]*$"),
          Validators.min(1000000000),
          Validators.max(9999999999),
          NotEqualValidator.notEqualValues(this.basicInfo.driver_national_id),
          AlreadyInsertedValidator.AlreadyInsertedValues(this.drivers)
        ]);
        this.DriverForm.controls["driver_national_id"].updateValueAndValidity();
      }
    });
    this.filteredOptions = this.DriverForm.controls[
      "birthYear"
    ].valueChanges.pipe(
      // startWith(""),
      map(value => this._filterYears(value))
    );
    this.filteredMonth = this.DriverForm.controls[
      "birthMonth"
    ].valueChanges.pipe(
      // startWith(""),
      map(value => this._filterMonths(value))
    );
  }
  dobSelect() {
    if (this.DriverForm.controls["driver_national_id"].valid) {
      if (
        (this.DriverForm.controls["driver_national_id"].value + "").charAt(
          0
        ) === "1"
      ) {
        this.hijri = true;
        this.Gregorian = false;

        this.DriverForm.controls["birthMonth"].setValue("");
        this.DriverForm.controls["birthYear"].setValue("");
        this.years = this.hijriYears;
        if (this.lang == "en") {
          this.months = this.enHijri;
        } else {
          this.months = this.arHijri;
        }
      } else if (
        (this.DriverForm.controls["driver_national_id"].value + "").charAt(
          0
        ) === "2"
      ) {
        this.hijri = false;
        this.Gregorian = true;
        this.DriverForm.controls["birthMonth"].setValue("");
        this.DriverForm.controls["birthYear"].setValue("");

        this.years = this.gerYears;
        console.log(this.years);
        if (this.lang == "en") {
          this.months = this.enGre;
        } else {
          this.months = this.arGer;
        }
        console.log(this.years, this.months);
      } else if (
        (this.DriverForm.controls["driver_national_id"].value + "").charAt(0) ==
        ""
      ) {
        this.hijri = false;
        this.Gregorian = false;
      }
    }
  }
  get f() {
    return this.DriverForm.controls;
  }
  private _filterYears(value: number) {
    const filterValue = value;
    console.log(value);
    if (value) {
      return this.years.filter(
        option => ("" + option).indexOf("" + filterValue) > -1
      );
    }
  }
  private _filterMonths(value: number) {
    const filterValue = value;
    return this.months.filter(
      option =>
        ("" + option.key).indexOf("" + filterValue) > -1 ||
        ("" + option.value).indexOf("" + filterValue) > -1
    );
  }
  driverMedical(e) {
    if (e.value == "1") {
      this.driverMedicalCheck = true;
      this.DriverForm.controls["Medical_conditions"].setValidators(
        Validators.required
      );
      this.DriverForm.controls["Medical_conditions"].updateValueAndValidity();
    } else {
      this.driverMedicalCheck = false;
      this.DriverForm.controls["Medical_conditions"].clearValidators();
      this.DriverForm.controls["Medical_conditions"].setValue([]);
      this.DriverForm.controls["Medical_conditions"].updateValueAndValidity();
    }
  }
  driverViolation(e) {
    if (e.value == "1") {
      this.driverViolationsCheck = true;
      this.DriverForm.controls["Traffic_violations"].setValidators(
        Validators.required
      );
      this.DriverForm.controls["Traffic_violations"].updateValueAndValidity();
    } else {
      this.driverViolationsCheck = false;
      this.DriverForm.controls["Traffic_violations"].clearValidators();
      this.DriverForm.controls["Traffic_violations"].setValue([]);
      this.DriverForm.controls["Traffic_violations"].updateValueAndValidity();
    }
  }
  DrivingPercentageFn(event: MatSelectChange) {
    // console.log(event.value);
    this.DrivingPercentage = event.value;
  }
  submit() {
    this.submitted = true;
    // scrollIfFormHasErrors(this.DriverForm).then(() => {
    //   // Run any additional functionality if you need to.
    // });
    if (this.DriverForm.invalid) {
      $("html, body").animate(
        {
          scrollTop: $(".ng-invalid").offset().top - 150
        },
        1000
      );
    }
    if (this.DriverForm.valid) {
      if (this.allowSubmit) {
        console.log(this.allowSubmit);
        this.allowSubmit = false;

        // if (this.DriverForm.valid) {
        this.driverService
          .validateDriverInfo({
            policyHolderId: this.basicInfo.insured_national_id,
            national_id: this.DriverForm.controls["driver_national_id"].value,
            birthMonth: this.DriverForm.controls["birthMonth"].value,
            birthYear: this.DriverForm.controls["birthYear"].value
          })
          .subscribe(
            (res: any) => {
              console.log(res);
              if (this.operation == "Add driver") {
                // console.log(this.DriverForm.value);
                this.allowSubmit = true;
                this.doneForm.emit(true);
                this.store.dispatch(
                  new DriversAcions.AddDriver({
                    driver_national_id: this.DriverForm.controls[
                      "driver_national_id"
                    ].value,
                    Education_qualification: this.DriverForm.controls[
                      "Education_qualification"
                    ].value,
                    children_below_16: this.DriverForm.controls[
                      "children_below_16"
                    ].value,
                    driver_name: res.data.name,
                    Traffic_violations: this.DriverForm.controls[
                      "Traffic_violations"
                    ].value,
                    Medical_conditions: this.DriverForm.controls[
                      "Medical_conditions"
                    ].value,
                    driving_percentage: this.DriverForm.controls[
                      "driving_percentage"
                    ].value,
                    birthYear: this.DriverForm.controls["birthYear"].value,
                    birthMonth: this.DriverForm.controls["birthMonth"].value
                    // name: res.data.name
                  })
                );
              }
              if (this.operation === "Edit driver") {
                // console.log("edit");
                this.DrivingPercentage = this.DriverForm.controls[
                  "driving_percentage"
                ].value;
                this.store.dispatch(
                  new DriversAcions.UpdateDriver({
                    oldID: this.editDriver.driver_national_id,
                    driver: {
                      // ...this.DriverForm.value,
                      driver_national_id: this.DriverForm.controls[
                        "driver_national_id"
                      ].value,
                      Education_qualification: this.DriverForm.controls[
                        "Education_qualification"
                      ].value,
                      children_below_16: this.DriverForm.controls[
                        "children_below_16"
                      ].value,
                      driver_name: res.data.name,
                      Traffic_violations: this.DriverForm.controls[
                        "Traffic_violations"
                      ].value,
                      Medical_conditions: this.DriverForm.controls[
                        "Medical_conditions"
                      ].value,
                      driving_percentage: this.DriverForm.controls[
                        "driving_percentage"
                      ].value,
                      birthYear: this.DriverForm.controls["birthYear"].value,
                      birthMonth: this.DriverForm.controls["birthMonth"].value
                      // name: res.data.name
                    }
                  })
                );
                this.cancelForm.emit(true);
              }
              this.store.dispatch(
                new DrivingPercentageAction.UpdateDrivingPercentage(
                  this.DrivingPercentage
                )
              );
              this.driverDetails = res.data.name;
              this.allowSubmit = true;
              this.doneForm.emit(true);
              $("html, body").animate(
                {
                  scrollTop: $("#drivers").offset().top - 150
                },
                500
              );
            },
            err => {
              // console.log(err);
              this.cancelForm.emit(true);
              this.formError.emit(err.message[0]);
              this.backvalidation = true;
            }
          );
        // }
      }
    }
    if (this.DriverForm.invalid) {
      this.allowSubmit = true;
    }
  }
  cancel() {
    // console.log(this.DrivingPercentage);
    if (this.DrivingPercentage) {
      if (this.editDriver) {
        this.store.dispatch(
          new DrivingPercentageAction.UpdateDrivingPercentage(
            this.editDriver.driving_percentage
          )
        );
      }
    } else {
      if (this.editDriver) {
        this.store.dispatch(
          new DrivingPercentageAction.UpdateDrivingPercentage(
            this.editDriver.driving_percentage
          )
        );
      }
    }
    this.cancelForm.emit(true);
    $("html, body").animate(
      {
        scrollTop: $("#drivers").offset().top - 150
      },
      500
    );
  }
}
