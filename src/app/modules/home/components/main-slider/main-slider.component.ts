import { Component, OnInit, HostListener } from "@angular/core";
import * as BasicInfoActions from "../../../../actions/basicInfo.action";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import * as $ from "jquery";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { Router } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { LookupsService } from "src/app/shared/services/lookups.service";
import { Agency } from "src/app/shared/models/agency.model";

@Component({
  selector: "app-main-slider",
  templateUrl: "./main-slider.component.html",
  styleUrls: ["./main-slider.component.scss"]
})
export class MainSliderComponent implements OnInit {
  insuranceForm: FormGroup;
  value = "0";
  minDate = moment(new Date()).add(1, "days");
  maxDate = moment(new Date()).add(15, "days");

  agencies = [];
  //   { logo: "../../../../../assets/icons/Malath.png" },
  //   { logo: "../../../../../assets/icons/Arabian-Shield.png" },
  //   { logo: "../../../../../assets/icons/ACIG.png" },
  //   { logo: "../../../../../assets/icons/Solidar .png" },
  //   { logo: "../../../../../assets/icons/MedGulf.jpg" },
  //   { logo: "../../../../../assets/icons/Takafol.jpg" },
  //   { logo: "../../../../../assets/icons/Tawuniya.jpg" }
  // ];
  customOptions: OwlOptions = {
    loop: true,
    nav: true,
    items: 5,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="material-icons">arrow_back</i>',
      '<i class="material-icons">arrow_forward</i>'
    ],
    rtl: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1300: {
        items: 5
      }
    }
  };
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private agenciesService: LookupsService
  ) {}
  ngOnInit() {
    this.insuranceForm = this.formBuilder.group({
      policy_effective_date: [
        { value: this.minDate, disabled: true },
        [Validators.required]
      ],
      registration_type: ["0", [Validators.required]],
      purpose_of_insurance: ["0", [Validators.required]]
    });
    this.insuranceForm.controls["registration_type"].valueChanges.subscribe(
      res => {
        // console.log("res");
        if (res === "0") {
          this.value = "0";
          // console.log("0");
        } else {
          this.value = "1";
          // console.log("1");
          this.insuranceForm.controls["purpose_of_insurance"].clearValidators();
          this.insuranceForm.controls[
            "purpose_of_insurance"
          ].updateValueAndValidity();
        }
      }
    );
    this.agenciesService
      .getAllInsuranceAgenciesLookups()
      .subscribe((res: any) => {
        // console.log(res.data);
        this.agencies = res.data.agency;
      });
  }
  get f() {
    return this.insuranceForm.controls;
  }
  homeSubmit() {
    if (this.insuranceForm.valid) {
      // console.log(this.insuranceForm.getRawValue());
      this.store.dispatch(
        new BasicInfoActions.UpdateBasicInfo({
          ...this.insuranceForm.value,
          policy_effective_date: moment(
            this.insuranceForm.getRawValue().policy_effective_date
          ).format("DD/MM/YYYY")
        })
      );
      this.router.navigate(["/quote/insurance-forms"]);
    }
  }
  // @HostListener("scroll", ["$event"])
  onScroll(event) {
    // let scrollTop =
    //   document.documentElement.scrollTop || document.body.scrollTop;
    // let clientHeight = document.documentElement.clientHeight;
    // console.log(clientHeight);
    // let scrollHeight = document.documentElement.scrollHeight;
    // if (scrollTop + clientHeight >= scrollHeight) {
    //FUNCTIONS WHEN BOTTOM
    this.router.navigate(["/how-it-works"]);
    // } else if (scrollTop + scrollHeight == scrollHeight) {
    //   //FUNCTIONS WHEN TOP
    //   // this.router.navigate(["/"]);
    // }
  }
}
