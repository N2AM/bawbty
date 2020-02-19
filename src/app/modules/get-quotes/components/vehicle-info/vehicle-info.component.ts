import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VehicleLookups } from "src/app/shared/models/vehicleLookups.model";
import { Router } from "@angular/router";
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import * as VehicleInfoFormActions from "../../../../actions/vehicleInfo.action";
import * as QuotesRequestActions from "../../../../actions/get-quotes.action";
import * as QuotesActions from "../../../../actions/quotes.action";
import * as ComparedActions from "../../../../actions/compared-items.action";
import * as DriversActions from "../../../../actions/driver.action";
import * as DriversPercentageActions from "../../../../actions/drivingPercentage.action";
import * as _ from "lodash";
import { combineLatest } from "rxjs";
import { GetQuotes } from "src/app/shared/models/getQuotes.model";
import { QuotesService } from "src/app/shared/services/quotes.service";
import * as $ from "jquery";
import { Quote } from "src/app/shared/models/quote.model";
import { QuoteModel } from "src/app/shared/models/quoteModel.model";
@Component({
  selector: "app-vehicle-info",
  templateUrl: "./vehicle-info.component.html",
  styleUrls: ["./vehicle-info.component.scss", " ../../../shared.scss"]
})
export class VehicleInfoComponent implements OnInit {
  @Output() switchTabs = new EventEmitter<any>();
  vehicleInfoForm: FormGroup;
  vehicleInfoLookups: VehicleLookups;
  quotes: GetQuotes;
  submitted: boolean = false;
  formError;
  backvalidation: boolean = false;
  agency: boolean;
  workshop: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private quotesService: QuotesService
  ) {}
  open: string;

  ngOnInit() {
    this.vehicleInfoForm = this.formBuilder.group({
      vehicle_value: [
        "",
        [
          Validators.required,
          Validators.min(10000),
          Validators.pattern("^[0-9]*$")
        ]
      ],
      overnight_parking: ["", [Validators.required]],
      transmission_type: ["0", [Validators.required]],
      expected_km_annual: ["", [Validators.required]],
      purpose_of_vehicle_use: ["", [Validators.required]],
      driving_city: ["", [Validators.required]],
      vehicle_specifications: [[""], []],
      repair_method: ["", [Validators.required]]
    });
    this.store.select("vehicleInfoLookups").subscribe((res: VehicleLookups) => {
      //// console.log(res);
      if (
        res &&
        res.Overnight_parkings &&
        res.Overnight_parkings.find(s => s.IsDefault == true) !== undefined
      ) {
        this.vehicleInfoLookups = res;
        console.log(
          res,
          this.vehicleInfoLookups.VehicleSpecifications.find(
            s => s.IsDefault == true
          )
        );
        this.vehicleInfoForm.setValue({
          vehicle_value: "",
          overnight_parking: this.vehicleInfoLookups.Overnight_parkings.find(
            s => s.IsDefault == true
          ).Id,
          transmission_type: "0",
          expected_km_annual: this.vehicleInfoLookups.Expected_km_anually.find(
            s => s.IsDefault == true
          ).Id,
          purpose_of_vehicle_use: this.vehicleInfoLookups.Purpose_of_vehicle_use.find(
            s => s.IsDefault == true
          ).Id,
          driving_city: "",
          repair_method: this.vehicleInfoLookups.RepairMethods.find(
            s => s.IsDefault == true
          ).Id,
          vehicle_specifications: ""
        });
        this.vehicleInfoForm.updateValueAndValidity();
        console.log(this.vehicleInfoForm.value);
      }
    });
    this.vehicleInfoForm.controls["repair_method"].valueChanges.subscribe(
      res => {
        console.log(res);
        if (res == 2) {
          this.agency = true;
          this.workshop = false;
          this.vehicleInfoForm.controls["vehicle_value"].setValidators([
            Validators.required,
            Validators.min(30000),
            Validators.pattern("^[0-9]*$")
          ]);
          this.vehicleInfoForm.controls[
            "vehicle_value"
          ].updateValueAndValidity();
        } else {
          this.agency = false;
          this.workshop = true;
          this.vehicleInfoForm.controls["vehicle_value"].setValidators([
            Validators.required,
            Validators.min(10000),
            Validators.pattern("^[0-9]*$")
          ]);
          this.vehicleInfoForm.controls[
            "vehicle_value"
          ].updateValueAndValidity();
        }
      }
    );
  }
  VehicleModifications(e) {
    //// console.log(e.value);
    this.open = e.value;
    if (e.value === "1") {
      this.vehicleInfoForm.controls["vehicle_specifications"].setValidators(
        Validators.required
      );
      this.vehicleInfoForm.controls[
        "vehicle_specifications"
      ].updateValueAndValidity();
    } else {
      this.vehicleInfoForm.controls["vehicle_specifications"].clearValidators();
      this.vehicleInfoForm.controls["vehicle_specifications"].setValue("");
      this.vehicleInfoForm.controls[
        "vehicle_specifications"
      ].updateValueAndValidity();
    }
  }
  moveToSelectedTab(e, c) {
    this.switchTabs.emit({ e, c });
  }
  get f() {
    return this.vehicleInfoForm.controls;
  }
  vInfo() {
    // scrollIfFormHasErrors(this.vehicleInfoForm).then(() => {
    //   // Run any additional functionality if you need to.
    // });
    if (this.vehicleInfoForm.invalid) {
      $("html, body").animate(
        {
          scrollTop: $(".ng-invalid").offset().top - 150
        },
        1000
      );
    }
    if (this.vehicleInfoForm.valid) {
      this.submitted = true;
      //// console.log(this.vehicleInfoForm.value);
      this.store.dispatch(
        new VehicleInfoFormActions.UpdateVehicleInfoForm(
          this.vehicleInfoForm.value
        )
      );
      combineLatest(
        this.store.select("basicInfo"),
        this.store.select("userInfoForm"),
        this.store.select("vehicleInfo")
      ).subscribe(res => {
        this.quotes = Object.assign({}, ...res);
      });
      this.store.select("driver").subscribe(res => {
        this.quotes = {
          ...this.quotes,
          drivers: res
        };
      });
      //// console.log(this.quotes);
      this.quotesService.getQuotes(this.quotes).subscribe(
        (res: Quote) => {
          //// console.log(res);
          if (res.success) {
            this.backvalidation = false;

            let quotes: QuoteModel[] = [];
            for (const obj of res.data.quotes) {
              obj.QuoteNumber = obj.QuoteNumber;
              obj.company_logo = obj.company_logo;
              obj.company_name = obj.company_name;
              obj.company_rate = obj.company_rate;
              obj.insurance_type = obj.insurance_type;
              obj.insurance_code = obj.insurance_code;
              obj.insurerCode = obj.insurerCode;
              obj.price = obj.price;
              obj.total_price = obj.price;
              obj.total_price = obj.total_price;
              obj.on_compare = obj.on_compare;
              obj.included_benefits = obj.quoteBenefits.filter(
                s => s.Type == 2 || s.Type == 3
              );
              if (obj.insurance_type == "TPL") {
                obj.additionalBenefits_and_PriceDetails = {
                  additional_benefits: obj.quoteBenefits.filter(
                    s => s.Type == 1
                  ),
                  price_details: {
                    BasicPremium: _.find(obj.PremiumBreakdownList, [
                      "BreakdownTypeID",
                      4
                    ])
                      ? _.find(obj.PremiumBreakdownList, ["BreakdownTypeID", 4])
                          .BreakdownAmount
                      : null,
                    NoClaimDiscount: _.find(obj.DiscountList, [
                      "DiscountTypeID",
                      2
                    ])
                      ? _.find(obj.DiscountList, ["DiscountTypeID", 2])
                          .DiscountAmount
                      : null,
                    ValueAddedTax: _.find(obj.PremiumBreakdownList, [
                      "BreakdownTypeID",
                      5
                    ])
                      ? _.find(obj.PremiumBreakdownList, ["BreakdownTypeID", 5])
                          .BreakdownAmount
                      : null,
                    additionalLoading: _.find(obj.PremiumBreakdownList, [
                      "BreakdownTypeID",
                      1
                    ])
                      ? _.find(obj.PremiumBreakdownList, ["BreakdownTypeID", 1])
                          .BreakdownAmount
                      : null,
                    loyaltyDiscount: _.find(obj.DiscountList, [
                      "DiscountTypeID",
                      3
                    ])
                      ? _.find(obj.DiscountList, ["DiscountTypeID", 3])
                          .DiscountAmount
                      : null,
                    specialDiscount: _.find(obj.DiscountList, [
                      "DiscountTypeID",
                      1
                    ])
                      ? _.find(obj.DiscountList, ["DiscountTypeID", 1])
                          .DiscountAmount
                      : null,
                    additionalAgeContribution: _.find(
                      obj.PremiumBreakdownList,
                      ["BreakdownTypeID", 2]
                    )
                      ? _.find(obj.PremiumBreakdownList, ["BreakdownTypeID", 2])
                          .BreakdownAmount
                      : null,
                    adminFees: _.find(obj.PremiumBreakdownList, [
                      "BreakdownTypeID",
                      3
                    ])
                      ? _.find(obj.PremiumBreakdownList, ["BreakdownTypeID", 3])
                          .BreakdownAmount
                      : null,
                    falCommission: _.find(obj.PremiumBreakdownList, [
                      "BreakdownTypeID",
                      6
                    ])
                      ? _.find(obj.PremiumBreakdownList, ["BreakdownTypeID", 6])
                          .BreakdownAmount
                      : null
                  }
                };
              } else if (obj.insurance_type == "Comprehensive") {
                obj.additionalBenefits_and_PriceDetails = {
                  additional_benefits: obj.quoteBenefits.filter(
                    s => s.Type == 1
                  ),
                  price_details: {
                    BasicPremium: _.find(
                      obj.deductiblesDetails[0].PremiumBreakdownList,
                      ["BreakdownTypeID", 4]
                    )
                      ? _.find(obj.deductiblesDetails[0].PremiumBreakdownList, [
                          "BreakdownTypeID",
                          4
                        ]).BreakdownAmount
                      : null,
                    NoClaimDiscount: _.find(
                      obj.deductiblesDetails[0].DiscountList,
                      ["DiscountTypeID", 2]
                    )
                      ? _.find(obj.deductiblesDetails[0].DiscountList, [
                          "DiscountTypeID",
                          2
                        ]).DiscountAmount
                      : null,
                    ValueAddedTax: _.find(
                      obj.deductiblesDetails[0].PremiumBreakdownList,
                      ["BreakdownTypeID", 5]
                    )
                      ? _.find(obj.deductiblesDetails[0].PremiumBreakdownList, [
                          "BreakdownTypeID",
                          5
                        ]).BreakdownAmount
                      : null,
                    additionalLoading: _.find(
                      obj.deductiblesDetails[0].PremiumBreakdownList,
                      ["BreakdownTypeID", 1]
                    )
                      ? _.find(obj.deductiblesDetails[0].PremiumBreakdownList, [
                          "BreakdownTypeID",
                          1
                        ]).BreakdownAmount
                      : null,
                    loyaltyDiscount: _.find(
                      obj.deductiblesDetails[0].DiscountList,
                      ["DiscountTypeID", 3]
                    )
                      ? _.find(obj.deductiblesDetails[0].DiscountList, [
                          "DiscountTypeID",
                          3
                        ]).DiscountAmount
                      : null,
                    specialDiscount: _.find(
                      obj.deductiblesDetails[0].DiscountList,
                      ["DiscountTypeID", 1]
                    )
                      ? _.find(obj.deductiblesDetails[0].DiscountList, [
                          "DiscountTypeID",
                          1
                        ]).DiscountAmount
                      : null,
                    additionalAgeContribution: _.find(
                      obj.deductiblesDetails[0].PremiumBreakdownList,
                      ["BreakdownTypeID", 2]
                    )
                      ? _.find(obj.deductiblesDetails[0].PremiumBreakdownList, [
                          "BreakdownTypeID",
                          2
                        ]).BreakdownAmount
                      : null,
                    adminFees: _.find(
                      obj.deductiblesDetails[0].PremiumBreakdownList,
                      ["BreakdownTypeID", 3]
                    )
                      ? _.find(obj.deductiblesDetails[0].PremiumBreakdownList, [
                          "BreakdownTypeID",
                          3
                        ]).BreakdownAmount
                      : null,
                    falCommission: _.find(
                      obj.deductiblesDetails[0].PremiumBreakdownList,
                      ["BreakdownTypeID", 6]
                    )
                      ? _.find(obj.deductiblesDetails[0].PremiumBreakdownList, [
                          "BreakdownTypeID",
                          6
                        ]).BreakdownAmount
                      : null
                  }
                };
              }
              quotes.push(obj);
            }
            console.log(quotes);
            quotes.map(option => {
              // let total_price = option.price;
              if (
                option.additionalBenefits_and_PriceDetails
                  .additional_benefits &&
                option.additionalBenefits_and_PriceDetails.additional_benefits
                  .length > 0 &&
                option.additionalBenefits_and_PriceDetails
                  .additional_benefits !== null
              ) {
                let benfits = option.additionalBenefits_and_PriceDetails.additional_benefits.map(
                  option => {
                    option = {
                      description: option.description,
                      id: option.id,
                      price: option.price,
                      checked: false,
                      Type: 1
                    };
                    return option;
                  }
                );
                option.additionalBenefits_and_PriceDetails.additional_benefits = benfits;
              }
              return option;
            });
            console.log(quotes);
            res.data.quotes = [...quotes];
            console.log(res.data, res.data.quotes);
            this.store.dispatch(
              new QuotesRequestActions.UpdateGetQuotes(this.quotes)
            );
            this.store.dispatch(new QuotesActions.UpdateQuotes(res.data));
            this.store.dispatch(new ComparedActions.RemoveAllComparedItems());
            this.store.dispatch(new DriversActions.removeAllDrivers());
            this.store.dispatch(
              new DriversPercentageActions.ResetDrivingPercentage()
            );
            localStorage.setItem("quotesRes", JSON.stringify(res.data));
            localStorage.setItem("quotes", JSON.stringify(res.data.quotes));

            this.router.navigate(["/quotes/view"]);
          } else if (res.code == 400) {
            // console.log(err);
            this.submitted = false;
            this.formError = res.message[0];
            setTimeout(() => {
              this.formError = "";
            }, 3000);
            this.backvalidation = true;
          }
        },
        err => {
          this.backvalidation = true;
          this.submitted = false;
          this.formError = err.message[0];
          setTimeout(() => {
            this.formError = "";
          }, 3000);
        }
      );
    } else {
      //// console.log("vi invalid");
      return;
    }
  }
}
