import { Component, OnInit } from "@angular/core";
import { PaymentService } from "src/app/shared/services/payment.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { PolicyService } from "src/app/shared/services/policy.service";
import * as PolicyActions from "../../../../actions/quote-policy.action";

@Component({
  selector: "app-policy",
  templateUrl: "./policy.component.html",
  styleUrls: ["./policy.component.scss"]
})
export class PolicyComponent implements OnInit {
  continue: boolean = false;
  url;
  options;
  policy;
  checkoutId;
  success: boolean = false;
  params;
  failed: boolean = false;
  credit = "credit";
  payCheck: boolean = false;
  iban;
  imgsCheck;
  data = {
    amount: "92",
    currency: "SAR",
    paymentType: "DB"
  };
  baseURL;
  allImagesUploaded: boolean = false;
  constructor(
    private http: PaymentService,
    private router: ActivatedRoute,
    private route: Router,
    private store: Store<AppState>,
    private policyService: PolicyService
  ) {
    this.baseURL = window.location.origin + "/policy/policy-details";
    console.log(this.baseURL);
    this.policy = JSON.parse(localStorage.getItem("policy"));
    // this.iban = localStorage.getItem("iban")
    //   ? localStorage.getItem("iban")
    //   : "";
    // if (localStorage.getItem("iban")) {
    //   this.continue = true;
    // }
    this.router.queryParams.subscribe(params => {
      console.log(params);
      this.params = params;
    });
    let DeductibleAmount = localStorage.getItem("DeductibleAmount")
      ? +localStorage.getItem("DeductibleAmount")
      : 0;
    this.policyService
      .getPolicyDetails(
        +localStorage.getItem("policyId"),
        JSON.parse(localStorage.getItem("selectedOptions")),
        localStorage.getItem("x_correlation_id"),
        DeductibleAmount
      )
      .subscribe(
        (res: any) => {
          this.store.dispatch(new PolicyActions.UpdatePolicy(res.data));
          localStorage.setItem("policy", JSON.stringify(res.data));
          this.policy = res.data;
        },
        err => {}
      );
  }

  ngOnInit() {
    if (this.params && !_.isEmpty(this.params)) {
      console.log(this.params);
      if (!localStorage.getItem("access-token")) {
        this.route.navigate(["/auth/login"]);
      }
      // this.continue = true;
      this.continue = false;
      this.payCheck = true;
      this.http
        .paymentResult(
          this.params.id,
          this.iban,
          localStorage.getItem("x_correlation_id"),
          localStorage.getItem("policyId"),
          this.data.paymentType,
          localStorage.getItem("access-token"),
          +localStorage.getItem("bc")
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            window.history.pushState(
              {},
              document.title,
              "/" + "policy/policy-details"
            );

            if (!res.success && this.iban) {
              this.route.navigate(["/policy/failed-payment"]);
              // console.log(this.iban);
              // this.http.pay(this.data).subscribe(
              //   (data: any) => {
              //     console.log(data);
              //     this.checkoutId = data.checkoutId;
              //     localStorage.setItem(
              //       "check",
              //       JSON.stringify(this.checkoutId)
              //     );
              //     console.log(this.checkoutId);
              //     let script = document.createElement("script");
              //     script.src =
              //       "https://test.oppwa.com/v2/paymentWidgets.js?checkoutId=" +
              //       this.checkoutId;
              //     document.body.appendChild(script);
              //   },
              //   error => {
              //     console.log(error);
              //   }
              // );
            } else {
              this.success = true;
              this.route.navigate(["/policy/policy-summary"]);
            }
          },
          err => {
            console.log(err);
          }
        );
    } else {
      localStorage.removeItem("iban");
      this.iban = "";
      localStorage.removeItem("VIN");
      localStorage.removeItem("Right side");
      localStorage.removeItem("Front");
      localStorage.removeItem("Rear");
      localStorage.removeItem("Left side");
    }
    console.log(this.policy);
    if (
      this.policy &&
      this.policy.PolicyDetails.InsuranceType === "Comprehensive"
    ) {
      console.log("here");
      this.store.select("vehicleImgs").subscribe(res => {
        console.log(res.length);
        if (res.length == 5) {
          this.allImagesUploaded = true;
          console.log(this.iban, this.imgsCheck);
          if (this.iban && this.imgsCheck) {
            this.continue = true;
          } else {
            this.continue = false;
          }
        } else {
          this.continue = false;
          this.allImagesUploaded = false;
        }
        console.log(res.length, this.continue);
      });
    }
  }
  ngAfterViewInit(): void {}
  checking(event) {
    // console.log(event);
    // this.continue = event.checked;
    // console.log(this.continue, this.success);
  }

  getRec() {
    this.payCheck = true;

    if (_.isEmpty(this.params)) {
      console.log(this.iban);
      this.http.pay(this.data).subscribe(
        (data: any) => {
          console.log(data);
          this.checkoutId = data.checkoutId;
          localStorage.setItem("check", JSON.stringify(this.checkoutId));
          console.log(this.checkoutId);
          let script = document.createElement("script");
          script.src =
            "https://test.oppwa.com/v2/paymentWidgets.js?checkoutId=" +
            this.checkoutId;
          document.body.appendChild(script);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  getIban(e) {
    console.log(e);

    if (
      this.policy &&
      e !== undefined &&
      this.policy.PolicyDetails.InsuranceType === "TPL"
    ) {
      this.iban = e.iban;
      // localStorage.setItem("iban", this.iban);
      this.continue = true;
      console.log(this.continue);
    } else if (
      this.policy &&
      e !== undefined &&
      this.policy.PolicyDetails.InsuranceType === "Comprehensive"
    ) {
      this.iban = e.iban;
      this.imgsCheck = e.imgsCheck;
      localStorage.setItem("iban", this.iban);
      console.log(this.iban, this.imgsCheck);
      if (this.allImagesUploaded && this.imgsCheck == true && this.iban) {
        console.log(this.allImagesUploaded);
        this.continue = true;
      } else {
        this.continue = false;
      }
    } else {
      this.continue = false;
    }
  }
}
