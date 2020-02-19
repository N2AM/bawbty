import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { MatSelectionListChange } from "@angular/material";
import * as _ from "lodash";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import * as ComparedItemsActions from "../../../../actions/compared-items.action";
import * as PolicyActions from "../../../../actions/quote-policy.action";
declare var $: any;
import { QuoteModel } from "src/app/shared/models/quoteModel.model";
import { Router } from "@angular/router";
import { PolicyService } from "src/app/shared/services/policy.service";
import { Policy } from "src/app/shared/models/policy.model";
import { Subscription } from "rxjs";
@Component({
  selector: "app-quote-view",
  templateUrl: "./quote-view.component.html",
  styleUrls: ["./quote-view.component.scss"]
})
export class QuoteViewComponent implements OnInit {
  @Input() quote: QuoteModel;
  @Input() x_correlation_id: any;
  @Input() id: any;
  length: number = 0;
  status = false;
  addedToCompare: boolean = false;
  private subs = new Subscription();
  additionalBenefitsSelections = [];
  selected;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private policy: PolicyService
  ) {
    // this.store.dispatch(new ComparedItemsActions.UpdateComparedItems([]));
  }
  ngOnInit() {
    // console.log(this.quote, this.status);
    if (
      this.quote.deductiblesDetails !== null &&
      this.quote.deductiblesDetails.length > 0 &&
      this.quote.insurance_type === "Comprehensive"
    ) {
      this.selected = this.quote.deductiblesDetails[0].DeductibleAmount;
    }
  }
  onSelection(event: MatSelectionListChange, c) {
    // console.log(event, event.option.value);
    this.quote.price = this.quote.price;
    if (event.option.selected === true) {
      this.quote.price = +parseFloat(
        this.quote.price +
          event.option.value.price +
          event.option.value.price * 0.05
      ).toFixed(1);
      for (const s of this.quote.additionalBenefits_and_PriceDetails
        .additional_benefits) {
        if (s === event.option.value) {
          s.checked = true;
        }
      }
      // console.log(this.quote.price);
    } else if (event.option.selected === false) {
      console.log(
        this.quote.price,
        event.option.value.price,
        this.quote.price - event.option.value.price
      );
      this.quote.price = +parseFloat(
        "" +
          (this.quote.price -
            event.option.value.price -
            event.option.value.price * 0.05)
      ).toFixed(1);
      for (const s of this.quote.additionalBenefits_and_PriceDetails
        .additional_benefits) {
        if (s === event.option.value) {
          s.checked = false;
        }
      }
      // console.log(this.quote.price);
    }
    this.quote.price = this.quote.price;
    if (this.addedToCompare === true) {
      // let allBenefites = _.uniq(
      //   _.map(
      //     this.quote.additionalBenefits_and_PriceDetails.additional_benefits,
      //     "description"
      //   )
      // );
      // let comparedItem = {
      //   id: this.quote.id,
      //   company_logo: this.quote.company_logo,
      //   company_name: this.quote.company_name,
      //   price: this.quote.price,
      //   total_Price: this.quote.total_price,
      //   additionalBenefits: this.quote.additionalBenefits_and_PriceDetails
      //     .additional_benefits,
      //   allBenefites_descriptions: allBenefites
      // };
      // console.log(comparedItem);
      this.store.dispatch(
        new ComparedItemsActions.UpdateComparedItems(this.quote)
      );
    }
  }
  compareToggle(item: QuoteModel) {
    // console.log(this.status);

    // console.log(item, this.length);
    // let allBenefites = _.uniq(
    //   _.map(
    //     item.additionalBenefits_and_PriceDetails.additional_benefits,
    //     "description"
    //   )
    // );
    // let comparedItem = {
    //   id: item.id,
    //   company_logo: item.company_logo,
    //   company_name: item.company_name,
    //   price: item.price,
    //   total_Price: item.total_price,
    //   additionalBenefits:
    //     item.additionalBenefits_and_PriceDetails.additional_benefits,
    //   allBenefites_descriptions: allBenefites
    // };
    if (this.length < 4) {
      this.status = !this.status;
      // console.log(this.length);
      if (this.status) {
        item.on_compare = true;

        this.store.dispatch(
          new ComparedItemsActions.AddComparedItems(this.quote)
        );
        this.addedToCompare = true;
      } else {
        this.store.dispatch(
          new ComparedItemsActions.RemoveComparedItems(this.quote)
        );
        this.addedToCompare = false;
        // this.store.dispatch(new ComparedItemsActions.UpdateComparedItems(item));
      }
      // this.addToLocalStorage(item);
    } else if (this.length >= 4 && !this.status) {
      $("#myModal").modal("show");
    } else if (this.length >= 4 && this.status) {
      this.store.dispatch(
        new ComparedItemsActions.RemoveComparedItems(this.quote)
      );
      this.addedToCompare = false;
    }
  }
  addToLocalStorage(item) {
    // // Parse the JSON stored in allEntriesP
    // let existingEntries = JSON.parse(localStorage.getItem("comparedItems"));
    // if (existingEntries == null) {
    //   existingEntries = [];
    // }
    // // Save allEntries back to local storage
    // existingEntries.push(item);
    // localStorage.setItem("comparedItems", JSON.stringify(existingEntries));
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.subs.add(
      this.store.select("comparedItems").subscribe(res => {
        if (res) {
          // console.log(res);
          if (
            res.find(item => item.QuoteNumber === this.quote.QuoteNumber) !==
            undefined
          ) {
            this.addedToCompare = true;
          } else {
            this.addedToCompare = false;
          }
          this.length = res.length;
          // console.log(this.length);
          if (
            res.find(s => s.QuoteNumber === this.quote.QuoteNumber) ===
            undefined
          ) {
            this.status = false;
          } else if (res.find(s => s.QuoteNumber === this.quote.QuoteNumber)) {
            this.status = true;
          }
        }
      })
    );
  }
  getPolicy(id) {
    if (this.quote.insurance_type === "Comprehensive") {
      localStorage.setItem("DeductibleAmount", "" + this.selected);
    } else {
      localStorage.setItem("DeductibleAmount", "0");
    }
    if (
      this.quote.additionalBenefits_and_PriceDetails.additional_benefits &&
      this.quote.additionalBenefits_and_PriceDetails.additional_benefits
        .length > 0
    ) {
      var selectedOptions = this.quote.additionalBenefits_and_PriceDetails.additional_benefits.filter(
        s => s.checked === true
      );
    } else {
      selectedOptions = [];
    }
    //   _.map(
    //   this.additionalBenefitsSelections,
    //   "description"
    // );
    // console.log(selectedOptions);
    localStorage.setItem("policyId", id);
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
    if (localStorage.getItem("access-token")) {
      this.router.navigate(["/policy/policy-details"]);
      // this.subs.add(
      //   this.policy
      //     .getPolicyDetails(id, selectedOptions, this.x_correlation_id)
      //     .subscribe(
      //       (res: any) => {
      //         this.store.dispatch(new PolicyActions.UpdatePolicy(res.data));
      //         localStorage.setItem("policy", JSON.stringify(res.data));
      //         // this.router.navigate(["/policy/policy-details"]);
      //       },
      //       err => {}
      //     )
      // );
    } else {
      this.router.navigate(["/auth/login"]);
      localStorage.setItem("nextRoute", "/policy/policy-details");
    }
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  getDeductible(event) {
    console.log(event);
    this.quote.selectedDeductible = event.value;
    localStorage.setItem(
      "DeductibleAmount",
      "" + this.quote.selectedDeductible
    );
    console.log(
      this.quote.deductiblesDetails.find(
        s => s.DeductibleAmount === event.value
      )
    );
    let selectedDeductible = this.quote.deductiblesDetails.find(
      s => s.DeductibleAmount === event.value
    );
    this.quote.additionalBenefits_and_PriceDetails = {
      additional_benefits: this.quote.quoteBenefits.filter(s => s.Type == 1),
      price_details: {
        BasicPremium: _.find(selectedDeductible.PremiumBreakdownList, [
          "BreakdownTypeID",
          4
        ])
          ? _.find(selectedDeductible.PremiumBreakdownList, [
              "BreakdownTypeID",
              4
            ]).BreakdownAmount
          : null,
        NoClaimDiscount: _.find(selectedDeductible.DiscountList, [
          "DiscountTypeID",
          2
        ])
          ? _.find(selectedDeductible.DiscountList, ["DiscountTypeID", 2])
              .DiscountAmount
          : null,
        ValueAddedTax: _.find(selectedDeductible.PremiumBreakdownList, [
          "BreakdownTypeID",
          5
        ])
          ? _.find(selectedDeductible.PremiumBreakdownList, [
              "BreakdownTypeID",
              5
            ]).BreakdownAmount
          : null,
        additionalLoading: _.find(selectedDeductible.PremiumBreakdownList, [
          "BreakdownTypeID",
          1
        ])
          ? _.find(selectedDeductible.PremiumBreakdownList, [
              "BreakdownTypeID",
              1
            ]).BreakdownAmount
          : null,
        loyaltyDiscount: _.find(selectedDeductible.DiscountList, [
          "DiscountTypeID",
          3
        ])
          ? _.find(selectedDeductible.DiscountList, ["DiscountTypeID", 3])
              .DiscountAmount
          : null,
        specialDiscount: _.find(selectedDeductible.DiscountList, [
          "DiscountTypeID",
          1
        ])
          ? _.find(selectedDeductible.DiscountList, ["DiscountTypeID", 1])
              .DiscountAmount
          : null,
        additionalAgeContribution: _.find(
          selectedDeductible.PremiumBreakdownList,
          ["BreakdownTypeID", 2]
        )
          ? _.find(selectedDeductible.PremiumBreakdownList, [
              "BreakdownTypeID",
              2
            ]).BreakdownAmount
          : null,
        adminFees: _.find(selectedDeductible.PremiumBreakdownList, [
          "BreakdownTypeID",
          3
        ])
          ? _.find(selectedDeductible.PremiumBreakdownList, [
              "BreakdownTypeID",
              3
            ]).BreakdownAmount
          : null,
        falCommission: _.find(selectedDeductible.PremiumBreakdownList, [
          "BreakdownTypeID",
          6
        ])
          ? _.find(selectedDeductible.PremiumBreakdownList, [
              "BreakdownTypeID",
              6
            ]).BreakdownAmount
          : null
      }
    };
  }
}
