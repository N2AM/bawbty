import { Component, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as $ from "jquery";
import * as _ from "lodash";
import { Output, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DateAdapter, MatAutocompleteTrigger } from "@angular/material";
import { BasicInfoService } from "src/app/shared/services/basic-info.service";
import { LookupsService } from "src/app/shared/services/lookups.service";
import { BasicInfo } from "src/app/shared/models/basic-info.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import * as BasicInfoActions from "../../../../actions/basicInfo.action";
import * as UserInfoActions from "../../../../actions/userInfo.action";
import { AlreadyInsertedValidator } from "src/app/core/validators/alreadyInserted.validator";
import { Driver } from "src/app/shared/models/driver.model";
import { scrollIfFormHasErrors } from "src/app/shared/utilities/validation-scroll";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-basic-info",
  templateUrl: "./basic-info.component.html",
  styleUrls: ["./basic-info.component.scss", " ../../../shared.scss"]
})
export class BasicInfoComponent implements OnInit {
  @Output() switchTabs = new EventEmitter<any>();
  basicInfo: BasicInfo;
  regType: string = "0";
  VehicleID;
  POI = 0;
  sequenceType: string = "0";
  minDate = moment(new Date()).add(1, "days");
  maxDate = moment(new Date()).add(15, "days");
  minGDate = moment(new Date()).add(-119, "years");
  maxGDate = moment(new Date()).add(-16, "years");
  // minHDate = { year: 1325, month: 1, day: 1 };
  // maxHDate = { year: 1425, month: 12, day: 30 };
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
  hijriMonths;
  insuranceForm: FormGroup;
  continue: boolean = false;
  formError;
  from;
  to;
  backvalidation: boolean = false;
  Usererror: boolean = false;
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
    private lookups: LookupsService,
    private formBuilder: FormBuilder,
    private basicInfoService: BasicInfoService,
    private _adapter: DateAdapter<any>,
    private translate: TranslateService,
    private store: Store<AppState>
  ) {
    for (let i = 1425; i >= 1325; i--) {
      this.hijriYears.push(i);
      this.years.push(i);
    }
    for (let i = 2003; i >= 1900; i--) {
      this.gerYears.push(i);
    }
    for (
      let i = new Date().getFullYear() + 1;
      i >= new Date().getFullYear() - 40;
      i--
    ) {
      this.manfactureYears.push(i);
    }
    this.insuranceForm = this.formBuilder.group({
      insuredNationalId: [
        "",
        [
          Validators.required,
          Validators.pattern("^[1,2][0-9]*$"),
          Validators.min(1000000000),
          Validators.max(9999999999)
          // RxwebValidators.different({ fieldName: "ownerNationalId" })
        ]
      ],
      sequenceNumber: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.min(100000000),
          Validators.max(999999999)
        ]
      ],
      policy_effective_date: [
        { value: this.minDate, disabled: true },
        [Validators.required]
      ],
      customNumber: ["", []],
      birthMonth: [
        "",
        [Validators.required, Validators.min(1), Validators.max(12)]
      ],
      birthYear: [
        "",
        [
          Validators.required
          // Validators.max(this.years[0]),
          // Validators.min(this.years[this.years.length - 1])
        ]
      ],
      manifucture_year: [""]
      // birthDateGregorian: [{ disabled: true }]
    });

    this.store.select("driver").subscribe(res => {
      this.drivers = res;
      // console.log(this.drivers);
      this.insuranceForm.controls["insuredNationalId"].setValidators([
        Validators.required,
        Validators.pattern("^[1,2][0-9]*$"),
        Validators.min(1000000000),
        Validators.max(9999999999),
        AlreadyInsertedValidator.AlreadyInsertedValues(this.drivers)
      ]);
      this.insuranceForm.controls["insuredNationalId"].updateValueAndValidity();
    });
  }

  ngOnInit() {
    this.months = this.enHijri;
    this.translate.onLangChange.subscribe(res => {
      this._adapter.setLocale(res.lang);
      this.lang = res.lang;
      console.log(res);
      if (res.lang == "ar") {
        console.log(res);
        if (this.hijri) {
          this.months = this.arHijri;
          this.years = this.hijriYears;
        } else {
          this.months = this.arGer;
          this.years = this.gerYears;
        }
      } else if (res.lang == "en") {
        console.log(res);
        if (this.hijri) {
          this.months = this.enHijri;
          this.years = this.hijriYears;
        } else {
          this.months = this.enGre;
          this.years = this.gerYears;
        }
      }
    });
    this.store.select("basicInfo").subscribe(res => {
      this.basicInfo = res;
      if (res && res.policy_effective_date !== "") {
        this.regType = "" + res.registration_type;
        if (this.regType == "1") {
          this.sequenceType = "";
          this.insuranceForm.controls["sequenceNumber"].clearValidators();
          // this.insuranceForm.controls["ownerNationalId"].clearValidators();
          this.insuranceForm.controls["customNumber"].setValidators([
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.min(1000000000),
            Validators.max(9999999999)
          ]);
          this.insuranceForm.controls["manifucture_year"].setValidators([
            Validators.required
          ]);
          this.insuranceForm.controls["customNumber"].updateValueAndValidity();
          this.insuranceForm.controls[
            "manifucture_year"
          ].updateValueAndValidity();
          this.insuranceForm.controls[
            "sequenceNumber"
          ].updateValueAndValidity();
          // this.insuranceForm.controls[
          //   "ownerNationalId"
          // ].updateValueAndValidity();
        } else if (this.regType == "0") {
          this.insuranceForm.controls["customNumber"].clearValidators();
          this.insuranceForm.controls["customNumber"].updateValueAndValidity();
          this.insuranceForm.controls["sequenceNumber"].setValidators([
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.min(100000000),
            Validators.max(999999999)
          ]);
          this.insuranceForm.controls["manifucture_year"].clearValidators();
          this.insuranceForm.controls[
            "manifucture_year"
          ].updateValueAndValidity();
          this.insuranceForm.controls[
            "sequenceNumber"
          ].updateValueAndValidity();
        }
        this.sequenceType = "" + res.purpose_of_insurance;
        this.POI = res.purpose_of_insurance;
        if (
          (this.regType === "0" && this.sequenceType === "0") ||
          (this.regType === "1" && this.sequenceType === "0")
        ) {
          // this.continue = false;
          // this.insuranceForm.controls["ownerNationalId"].clearValidators();
          // this.insuranceForm.controls[
          //   "ownerNationalId"
          // ].updateValueAndValidity();
        } else if (this.regType == "0" || this.sequenceType == "1") {
          // this.insuranceForm.controls["ownerNationalId"].setValidators([
          //   Validators.required,
          //   Validators.pattern("^[1,2][0-9]*$"),
          //   Validators.min(1000000000),
          //   Validators.max(9999999999),
          //   RxwebValidators.different({ fieldName: "insuredNationalId" })
          // ]);
          // this.insuranceForm.controls[
          //   "ownerNationalId"
          // ].updateValueAndValidity();
        }
        this.insuranceForm.controls["policy_effective_date"].setValue(
          moment(res.policy_effective_date, "DD/MM/YYYY")
        );
      }
    });
    this.insuranceForm.controls["insuredNationalId"].valueChanges.subscribe(
      res => {
        if (this.insuranceForm.controls["insuredNationalId"].valid) {
          if (
            (
              this.insuranceForm.controls["insuredNationalId"].value + ""
            ).charAt(0) === "1"
          ) {
            this.hijri = true;
            this.Gregorian = false;

            this.insuranceForm.controls["birthMonth"].setValue("");
            this.insuranceForm.controls["birthYear"].setValue("");
            this.years = this.hijriYears;
            if (this.lang == "en") {
              this.months = this.enHijri;
            } else {
              this.months = this.arHijri;
            }
          } else if (
            (
              this.insuranceForm.controls["insuredNationalId"].value + ""
            ).charAt(0) === "2"
          ) {
            this.hijri = false;
            this.Gregorian = true;
            this.insuranceForm.controls["birthMonth"].setValue("");
            this.insuranceForm.controls["birthYear"].setValue("");

            this.years = this.gerYears;
            console.log(this.years);
            if (this.lang == "en") {
              this.months = this.enGre;
            } else {
              this.months = this.arGer;
            }
            console.log(this.years, this.months);
          } else if (
            (
              this.insuranceForm.controls["insuredNationalId"].value + ""
            ).charAt(0) == ""
          ) {
            this.hijri = false;
            this.Gregorian = false;
          }
        }
      }
    );
    this.filteredOptions = this.insuranceForm.controls[
      "birthYear"
    ].valueChanges.pipe(
      // startWith(""),
      map(value => this._filterYears(value))
    );
    this.filteredMonth = this.insuranceForm.controls[
      "birthMonth"
    ].valueChanges.pipe(
      // startWith(""),
      map(value => this._filterMonths(value))
    );
  }

  dobSelect() {
    if (this.insuranceForm.controls["insuredNationalId"].valid) {
      if (
        (this.insuranceForm.controls["insuredNationalId"].value + "").charAt(
          0
        ) === "1"
      ) {
        this.hijri = true;
        this.Gregorian = false;

        this.insuranceForm.controls["birthMonth"].setValue("");
        this.insuranceForm.controls["birthYear"].setValue("");
        this.years = this.hijriYears;
        if (this.lang == "en") {
          this.months = this.enHijri;
        } else {
          this.months = this.arHijri;
        }
      } else if (
        (this.insuranceForm.controls["insuredNationalId"].value + "").charAt(
          0
        ) === "2"
      ) {
        this.hijri = false;
        this.Gregorian = true;
        this.insuranceForm.controls["birthMonth"].setValue("");
        this.insuranceForm.controls["birthYear"].setValue("");

        this.years = this.gerYears;
        console.log(this.years);
        if (this.lang == "en") {
          this.months = this.enGre;
        } else {
          this.months = this.arGer;
        }
        console.log(this.years, this.months);
      } else if (
        (this.insuranceForm.controls["insuredNationalId"].value + "").charAt(
          0
        ) == ""
      ) {
        this.hijri = false;
        this.Gregorian = false;
      }
    }
  }
  get f() {
    return this.insuranceForm.controls;
  }

  private _filterYears(value: number) {
    const filterValue = value;
    // console.log(value, this.years[0], this.years[this.years.length - 1]);
    if (value > this.years[0] || value < this.years[this.years.length - 1]) {
      console.log(value, this.years[0], this.years[this.years.length - 1]);
      this.insuranceForm.controls["birthYear"].setValidators([
        Validators.min(this.years[this.years.length - 1]),
        Validators.max(this.years[0])
      ]);
      // this.insuranceForm.controls["birthYear"].updateValueAndValidity();
    }
    if (value) {
      return this.years.filter(
        option => ("" + option).indexOf("" + filterValue) > -1
      );
    } else {
      return;
    }
  }
  private _filterMonths(value: number) {
    const filterValue = value;
    if (value) {
      return this.months.filter(
        option =>
          ("" + option.key).indexOf("" + filterValue) > -1 ||
          ("" + option.value).indexOf("" + filterValue) > -1
      );
    } else {
      return;
    }
    // return this.months.filter(
    //   option =>
    //     ("" + option.key).indexOf("" + filterValue) > -1 ||
    //     ("" + option.value).indexOf("" + filterValue) > -1
    // );
  }
  onBasicSubmit() {
    if (this.insuranceForm.invalid) {
      $("html, body").animate(
        {
          scrollTop: $(".ng-invalid").offset().top - 150
        },
        1000
      );
    }
    // scrollIfFormHasErrors(this.insuranceForm).then(() => {
    //   // Run any additional functionality if you need to.
    // });
    // const firstElementWithError = document.querySelector(".ng-invalid");

    // if (firstElementWithError) {
    //   firstElementWithError.scrollIntoView({ behavior: "smooth" });
    // }
    // console.log(this.insuranceForm.value);
    if (this.insuranceForm.valid) {
      // console.log(this.insuranceForm.controls["birthMonth"].value);
      this.lookups.getUserInfoLookups();
      console.log(this.insuranceForm.getRawValue());
      this.continue = false;
      // if (this.Gregorian) {
      //   let month = this.insuranceForm.controls["birthDateGregorian"].value;
      //   this.birthMonth = month < 10 ? "0" + month : "" + month;
      //   this.birthYear = this.insuranceForm.controls[
      //     "birthDateGregorian"
      //   ].value._d.getFullYear();
      // } else if (this.hijri) {
      this.birthMonth =
        this.insuranceForm.controls["birthMonth"].value < 10
          ? "0" + this.insuranceForm.controls["birthMonth"].value
          : "" + this.insuranceForm.controls["birthMonth"].value;
      this.birthYear = this.insuranceForm.controls["birthYear"].value;
      // }
      this.basicInfoService
        .postBasicInfo({
          RegistrationType: +this.regType,
          PurposeOfInsurance: +this.sequenceType,
          // ...this.insuranceForm.value,
          CustomNumber: this.insuranceForm.controls["customNumber"].value,
          SequenceNumber: this.insuranceForm.controls["sequenceNumber"].value,
          insuredNationalId: this.insuranceForm.controls["insuredNationalId"]
            .value,
          BirthMonth: this.birthMonth,
          BirthYear: this.birthYear,
          manifucture_year: this.insuranceForm.controls["manifucture_year"]
            .value
        })
        .subscribe(
          (res: any) => {
            if (res.code == null) {
              // console.log(res);

              this.lookups.getvehicleInfoLookups();
              this.store.dispatch(new UserInfoActions.UpdateUserInfo(res.data));
              this.switchTabs.emit({
                e: this.from,
                c: this.to
              });
              this.backvalidation = false;
              this.continue = true;
            } else if (res.code == 400) {
              // console.log(err);
              this.continue = true;
              this.formError = res.message[0];
              setTimeout(() => {
                this.formError = "";
              }, 4000);
              this.switchTabs.emit({ e: 0, c: 0 });
              this.backvalidation = true;
            }
          },
          err => {
            // console.log(err);
            this.continue = true;
            this.formError = err.message[0];
            setTimeout(() => {
              this.formError = "";
            }, 4000);
            this.switchTabs.emit({ e: 0, c: 0 });
            this.backvalidation = true;
          }
        );

      this.VehicleID =
        this.regType == "0"
          ? +this.insuranceForm.getRawValue().sequenceNumber
          : +this.insuranceForm.getRawValue().customNumber;
      console.log(this.regType, this.VehicleID);
      this.store.dispatch(
        new BasicInfoActions.UpdateBasicInfo({
          registration_type: +this.regType,
          purpose_of_insurance: +this.sequenceType,
          VehicleID: this.VehicleID,
          insured_national_id: this.insuranceForm.getRawValue()
            .insuredNationalId,
          policy_effective_date: moment(
            this.insuranceForm.getRawValue().policy_effective_date
          ).format("DD/MM/YYYY"),
          manifucture_year: this.insuranceForm.controls["manifucture_year"]
            .value
        })
      );

      // console.log(this.insuranceForm.getRawValue());
    } else {
      // console.log("invalid");
      return;
    }
  }

  checking(e) {
    // console.log(e.checked);
    this.continue = e.checked;
    // this.checkerChecked = e.checked;
  }
  radioChange(e) {
    this.sequenceType = e.value;
    console.log(this.sequenceType, this.regType);
    // this.insuranceForm.reset();
    if (
      (this.regType === "0" && this.sequenceType === "0") ||
      (this.regType === "1" && this.sequenceType === "0")
    ) {
      // this.continue = false;
      // this.insuranceForm.controls["ownerNationalId"].clearValidators();
      // this.insuranceForm.controls["ownerNationalId"].updateValueAndValidity();
      this.insuranceForm.controls["manifucture_year"].clearValidators();
      this.insuranceForm.controls["manifucture_year"].updateValueAndValidity();
    } else if (this.regType == "0" || this.sequenceType == "1") {
      this.insuranceForm.controls["insuredNationalId"].setValidators([
        Validators.required,
        Validators.pattern("^[1,2][0-9]*$"),
        Validators.min(1000000000),
        Validators.max(9999999999)
        // RxwebValidators.different({ fieldName: "ownerNationalId" })
      ]);
      this.insuranceForm.controls["insuredNationalId"].updateValueAndValidity();
      this.insuranceForm.controls["manifucture_year"].setValidators([
        Validators.required
      ]);

      this.insuranceForm.controls["manifucture_year"].updateValueAndValidity();
      // this.insuranceForm.controls["ownerNationalId"].setValidators([
      //   Validators.required,
      //   Validators.pattern("^[1,2][0-9]*$"),
      //   Validators.min(1000000000),
      //   Validators.max(9999999999),
      //   RxwebValidators.different({ fieldName: "insuredNationalId" })
      // ]);
      // this.insuranceForm.controls["ownerNationalId"].updateValueAndValidity();
    }
  }
  mainRadioChange(e) {
    this.regType = e.value;
    // this.continue = false;
    // this.insuranceForm.reset();
    if (this.regType == "1") {
      this.sequenceType = "";
      this.insuranceForm.controls["sequenceNumber"].clearValidators();
      // this.insuranceForm.controls["ownerNationalId"].clearValidators();
      this.insuranceForm.controls["customNumber"].setValidators([
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(1000000000),
        Validators.max(9999999999)
      ]);
      this.insuranceForm.controls["manifucture_year"].setValidators([
        Validators.required
      ]);
      this.insuranceForm.controls["customNumber"].updateValueAndValidity();
      this.insuranceForm.controls["manifucture_year"].updateValueAndValidity();

      this.insuranceForm.controls["sequenceNumber"].updateValueAndValidity();
      // this.insuranceForm.controls["ownerNationalId"].updateValueAndValidity();
    } else if (this.regType == "0") {
      this.insuranceForm.controls["customNumber"].clearValidators();
      this.insuranceForm.controls["customNumber"].updateValueAndValidity();
      this.insuranceForm.controls["manifucture_year"].clearValidators();
      this.insuranceForm.controls["manifucture_year"].updateValueAndValidity();

      this.insuranceForm.controls["sequenceNumber"].setValidators([
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(100000000),
        Validators.max(999999999)
      ]);
      this.insuranceForm.controls["sequenceNumber"].updateValueAndValidity();
    }
  }

  moveToSelectedTab(e, c) {
    if (this.insuranceForm.valid) {
      this.from = e;
      this.to = c;
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    $(".mat-icon-button.mat-button-base").click(function() {
      $("button.mat-calendar-period-button.mat-button.mat-button-base").prop(
        "disabled",
        true
      );
      $(".mat-calendar-period-button .mat-calendar-arrow").css(
        "display",
        "none"
      );
      $(".mat-calendar-period-button .mat-button-wrapper").css("color", "#000");
    });
  }
}
