import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import * as PolicyActions from "../../../../actions/quote-policy.action";
import { BehaviorSubject, config } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import * as _ from "lodash";
import * as ComparedItemsActions from "../../../../actions/compared-items.action";
import {
  MatListOption,
  MatSelectionListChange,
  MatSelectionList
} from "@angular/material/list";
import { PolicyService } from "src/app/shared/services/policy.service";
import { Router } from "@angular/router";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-compare-quotes",
  templateUrl: "./compare-quotes.component.html",
  styleUrls: ["./compare-quotes.component.scss"]
})
export class CompareQuotesComponent implements OnInit {
  sortArr = [];
  selectedOptions = [];
  selectedOption;
  @ViewChild("prices", { static: false }) prices: SelectionModel<
    MatSelectionList
  >;
  comparedItems = [];
  additionalBenefits_and_PriceDetails: {};
  constructor(
    private store: Store<AppState>,
    private policy: PolicyService,
    private router: Router
  ) {}
  changed = new BehaviorSubject(false);
  @ViewChild("test", { static: false }) test: ElementRef;
  listOfAdditionalBenefits: [];
  // private changes: MutationObserver;
  filteredItems = [];
  close: boolean = false;
  additionalDes = [];
  originalList = [];
  price = new Map();
  checkListCounts = [];
  ngOnInit() {
    this.store.select("comparedItems").subscribe((res: []) => {
      console.log(res);

      if (res.length > 0) {
        this.comparedItems = res;
      } else {
        this.comparedItems = JSON.parse(localStorage.getItem("ci"));
        // this.originalList = JSON.parse(localStorage.getItem("ci"));
      }
      if (this.comparedItems.length > 2) {
        this.close = true;
      } else {
        this.close = false;
      }
      console.log(this.comparedItems);
      for (const comparedItem of this.comparedItems) {
        let allBenefites = _.uniq(
          _.map(
            comparedItem.additionalBenefits_and_PriceDetails
              .additional_benefits,
            "description"
          )
        );
        this.additionalDes.push(...allBenefites);
      }
      this.additionalDes = _.uniq(this.additionalDes);
      console.log(this.additionalDes);
      this.getRows(this.comparedItems, this.additionalDes);
    });

    console.log(this.selectedOptions);
  }
  getRows(comparedItems: any[], additionalDes: any[]) {
    for (const f of additionalDes) {
      let listOfAdditionalBenefits = [];
      for (const d of comparedItems) {
        if (
          d.additionalBenefits_and_PriceDetails.additional_benefits.find(
            s => s.description == f
          ) == undefined
        ) {
          listOfAdditionalBenefits.push({
            description: "",
            price: "",
            itemId: d.QuoteNumber,
            checked: false
          });
        } else {
          listOfAdditionalBenefits.push({
            description: d.additionalBenefits_and_PriceDetails.additional_benefits.find(
              s => s.description == f
            ).description,
            price: d.additionalBenefits_and_PriceDetails.additional_benefits.find(
              s => s.description == f
            ).price,
            itemId: d.QuoteNumber,
            checked: d.additionalBenefits_and_PriceDetails.additional_benefits.find(
              s => s.description == f
            ).checked
          });
        }
      }
      console.log(listOfAdditionalBenefits);
      this.price.set(f, listOfAdditionalBenefits);
    }
    console.log(this.price);
  }
  onSelection(e: MatSelectionListChange) {
    console.log(e);

    // this.comparedItems.find(s => s.QuoteNumber == e.option.value.itemId);
    // this.comparedItems.find(
    //   s => s.QuoteNumber == e.option.value.itemId
    // ).price = parseFloat(
    //   this.comparedItems.find(s => s.QuoteNumber == e.option.value.itemId).price
    // ).toFixed(1);
    if (e.option.selected === true) {
      this.comparedItems.find(
        s => s.QuoteNumber == e.option.value.itemId
      ).price = +parseFloat(
        "" +
          (this.comparedItems.find(s => s.QuoteNumber == e.option.value.itemId)
            .price +
            e.option.value.price +
            e.option.value.price * 0.05)
      ).toFixed(1);
      console.log(
        // parseFloat(
        this.comparedItems.find(s => s.QuoteNumber == e.option.value.itemId)
          .price +
          e.option.value.price +
          e.option.value.price * 0.05,
        // ).toFixed(1),
        this.comparedItems.find(s => s.QuoteNumber == e.option.value.itemId)
          .price
      );
      for (let h of this.comparedItems.find(
        s => s.QuoteNumber == e.option.value.itemId
      ).additionalBenefits_and_PriceDetails.additional_benefits) {
        // console.log(h, e.option.value, _.isEqual(h, e.option.value));
        if (h.description === e.option.value.description) {
          h.checked = true;
        }
      }
    } else if (e.option.selected === false) {
      this.comparedItems.find(
        s => s.QuoteNumber == e.option.value.itemId
      ).price = +parseFloat(
        "" +
          (this.comparedItems.find(s => s.QuoteNumber == e.option.value.itemId)
            .price -
            e.option.value.price -
            e.option.value.price * 0.05)
      ).toFixed(1);
      console.log(
        this.comparedItems.find(s => s.QuoteNumber == e.option.value.itemId)
          .price
      );
      for (let h of this.comparedItems.find(
        s => s.QuoteNumber == e.option.value.itemId
      ).additionalBenefits_and_PriceDetails.additional_benefits) {
        console.log(_.isEqual(h, e.option.value));
        if (h.description === e.option.value.description) {
          h.checked = false;
        }
      }
    }
    // this.comparedItems.find(
    //   s => s.QuoteNumber == e.option.value.itemId
    // ).price = this.comparedItems.find(
    //   s => s.QuoteNumber == e.option.value.itemId
    // ).price;
  }
  removeComapredItem(comparedItem) {
    console.log(comparedItem);
    this.store.dispatch(
      new ComparedItemsActions.RemoveComparedItems(comparedItem)
    );
    this.comparedItems.map(item => {
      // item.price = item.total_price;
    });
    this.comparedItems.filter(s => s !== comparedItem);
    localStorage.setItem(
      "ci",
      JSON.stringify(
        this.comparedItems.filter(
          s => s.QuoteNumber !== comparedItem.QuoteNumber
        )
      )
    );
  }
  clearAll() {
    this.comparedItems = JSON.parse(localStorage.getItem("ci"));

    console.log(this.comparedItems);
    let comparedItems = this.comparedItems.map(option => {
      option.price = option.total_price;
      if (
        option.additionalBenefits_and_PriceDetails.additional_benefits &&
        option.additionalBenefits_and_PriceDetails.additional_benefits !== [] &&
        option.additionalBenefits_and_PriceDetails.additional_benefits !== null
      ) {
        option.additionalBenefits_and_PriceDetails.additional_benefits.map(
          ben => {
            ben.checked = false;
          }
        );
      }
      console.log(option);
      return option;
    });
    console.log(comparedItems, this.comparedItems);
    // this.originalList = JSON.parse(localStorage.getItem("ci"));
    this.comparedItems = comparedItems;

    this.getRows(comparedItems, this.additionalDes);
  }
  getPolicy(item) {
    if (item.insurance_type === "Comprehensive") {
      localStorage.setItem("DeductibleAmount", item.DeductibleAmount);
    } else {
      localStorage.setItem("DeductibleAmount", "0");
    }
    let selectedOptions = item.additionalBenefits_and_PriceDetails.additional_benefits.filter(
      s => s.checked !== false
    );
    //   _.map(
    //   item.additionalBenefits.filter(s => s.checked !== false),
    //   "description"
    // );

    // .
    localStorage.setItem("policyId", item.QuoteNumber);
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
    if (localStorage.getItem("access-token")) {
      this.router.navigate(["/policy/policy-details"]);
      // this.policy
      //   .getPolicyDetails(
      //     item.QuoteNumber,
      //     selectedOptions,
      //     localStorage.getItem("x_correlation_id")
      //   )
      //   .subscribe(
      //     (res: any) => {
      //       this.store.dispatch(new PolicyActions.UpdatePolicy(res.data));
      //       localStorage.setItem("policy", JSON.stringify(res.data));

      //     },
      //     err => {}
      //   );
    } else {
      this.router.navigate(["/auth/login"]);
      localStorage.setItem("nextRoute", "/policy/policy-details");
    }
  }
  ngOnChanges(): void {
    this.comparedItems = JSON.parse(localStorage.getItem("ci"));
  }
}
