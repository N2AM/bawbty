import { Component, OnInit, ViewChild } from "@angular/core";
declare var $: any;
import { QuotesService } from "src/app/shared/services/quotes.service";
import { Quote } from "src/app/shared/models/quote.model";
import { GetQuotesByFilter } from "src/app/shared/models/getQuotesByFilter.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { QuoteModel } from "src/app/shared/models/quoteModel.model";
import * as ComparedItemsActions from "../../../../actions/compared-items.action";
import { GetQuotes } from "src/app/shared/models/getQuotes.model";
import * as QuotesActions from "../../../../actions/quotes.action";
import { Subscription } from "rxjs";
import { CountdownComponent } from "ngx-countdown";
import { json } from "@rxweb/reactive-form-validators";

@Component({
  selector: "app-quotes-view",
  templateUrl: "./quotes-view.component.html",
  styleUrls: ["./quotes-view.component.scss"]
})
export class QuotesViewComponent implements OnInit {
  @ViewChild("cd", { static: false }) private countdown: CountdownComponent;
  // selector = '.main-panel';
  comparedItems: QuoteModel[];
  private subs = new Subscription();
  getQuotesRequest: GetQuotes;
  // quotesRequestInfo = {};
  // quotesData: Quote[];
  x_correlation_id;
  quotesViewData: Quote;
  page = 1;
  quotesFilter: GetQuotesByFilter = {
    insurance_type: 0,
    deductible: 0,
    insurance_agencies: [],
    sort: "0",
    current_page: 1,
    page_size: 20,
    x_correlation_id: this.x_correlation_id
  };
  insuranceTypes = [
    { id: 0, name: "All" },
    { id: 1, name: "TPL" },
    { id: 2, name: "Comprehensive" }
  ];
  maintenanceCenters = [
    { id: 0, name: "All" },
    { id: 1, name: "Workshop" },
    { id: 2, name: "Agency" }
  ];
  deselectAll = false;
  constructor(
    private store: Store<AppState>,
    private quotesService: QuotesService
  ) {
    // this.store.dispatch(new ComparedItemsActions.UpdateComparedItems([]));
    this.subs.add(
      this.store.select("quotesRequest").subscribe(res => {
        // console.log(res);
        this.getQuotesRequest = res;
      })
    );
  }
  ngOnInit() {
    this.subs.add(
      this.store.select("quotes").subscribe((res: Quote) => {
        // console.log(res);
        if (res && res.quotes && res.quotes.length > 0) {
          this.quotesViewData = res;
          // this.quotesViewData.quotes =
          //   res.quotes.length > 1
          //     ? res.quotes
          //     : JSON.parse(localStorage.getItem("quotes"));
          // console.log(res);
          this.quotesFilter.x_correlation_id = res.x_correlation_id;
          this.x_correlation_id = res.x_correlation_id;
          localStorage.setItem("x_correlation_id", this.x_correlation_id);
          // this.store.dispatch(new QuotesActions.UpdateQuotes(this.quotesViewData));
        } else {
          this.quotesViewData = JSON.parse(localStorage.getItem("quotesRes"));
          console.log(this.quotesViewData);
        }
      })
    );
    this.subs.add(
      this.store.select("comparedItems").subscribe((res: QuoteModel[]) => {
        this.comparedItems = res;
        // console.log(res, this.comparedItems);
      })
    );
  }
  handleEvent(e) {
    if (e.left === 0) {
      $("#timer").modal("show");
    }
  }
  update() {
    //
  }
  // ngOnChanges() {
  //   this.store.select("comparedItems").subscribe((res: QuoteModel[]) => {
  //     this.comparedItems = res;
  //    // console.log(res, this.comparedItems);
  //   });
  // }
  getQuotesByFilter(filter) {
    this.subs.add(
      this.quotesService.getQuotesByFilter(filter).subscribe((res: any) => {
        // console.log(this.quotesViewData.quotes);
        let quotes = res.data.quotes.map(option => {
          let total_price = option.price;
          if (
            option.additionalBenefits_and_PriceDetails.additional_benefits &&
            option.additionalBenefits_and_PriceDetails.additional_benefits
              .length > 0 &&
            option.additionalBenefits_and_PriceDetails.additional_benefits !==
              null
          ) {
            let benfits = option.additionalBenefits_and_PriceDetails.additional_benefits.map(
              option => {
                option = {
                  description: option.description,
                  id: option.id,
                  price: option.price,
                  checked: false
                };
                return option;
              }
            );

            option.additionalBenefits_and_PriceDetails.additional_benefits = benfits;
          }
          return { ...option, total_price: total_price };
        });
        res.data.quotes = [...quotes];
        this.quotesViewData = res.data;
      })
    );
  }
  sortValue(e) {
    // console.log(e.target.value);
    const sortVal = {
      sort: e.target.value,
      current_page: 1
    };
    this.quotesFilter.sort = sortVal.sort;
    this.quotesFilter.current_page = sortVal.current_page;
    // console.log(this.quotesFilter);
    this.getQuotesByFilter(this.quotesFilter);
  }
  resetFilters() {
    this.deselectAll = true;
    // $('#sortSelect').val(0);
    this.insuranceTypes = [
      { id: 0, name: "All" },
      { id: 1, name: "TPL" },
      { id: 2, name: "Comprehensive" }
    ];
    this.maintenanceCenters = [
      { id: 0, name: "All" },
      { id: 1, name: "Workshop" },
      { id: 2, name: "Agency" }
    ];
    this.quotesFilter = {
      insurance_type: 0,
      // maintenance_center: 0,
      x_correlation_id: this.x_correlation_id,
      deductible: 0,
      insurance_agencies: [],
      sort: $("#sortSelect").val(),
      current_page: 1,
      page_size: 20
    };
    this.getQuotesByFilter(this.quotesFilter);
  }
  onScroll() {
    // this.quotesFilter.current_page = this.page + 1;
    // console.log(this.quotesFilter);
    // this.quotesFilter.sort = $("#sortSelect").val();
    // console.log(this.quotesFilter);
    // this.subs.add(
    //   this.quotesService
    //     .getQuotesByFilter(this.quotesFilter)
    //     // .getQuotes(this.quotesFilter)
    //     .subscribe((res: any) => {
    //       if (
    //         this.quotesViewData.quotes.length < this.quotesViewData.total_items
    //       ) {
    //         let quotes = res.data.quotes.map(option => {
    //           let total_price = option.price;
    //           if (
    //             option.additionalBenefits_and_PriceDetails
    //               .additional_benefits &&
    //             option.additionalBenefits_and_PriceDetails
    //               .additional_benefits !== [] &&
    //             option.additionalBenefits_and_PriceDetails
    //               .additional_benefits !== null
    //           ) {
    //             let benfits = option.additionalBenefits_and_PriceDetails.additional_benefits.map(
    //               option => {
    //                 option = {
    //                   description: option.description,
    //                   id: option.id,
    //                   price: option.price,
    //                   checked: false
    //                 };
    //                 return option;
    //               }
    //             );
    //             option.additionalBenefits_and_PriceDetails.additional_benefits = benfits;
    //           }
    //           return { ...option, total_price: total_price };
    //         });
    //         res.data.quotes = [...quotes];
    //         // console.log(res.data, res.data.quotes);
    //         this.quotesViewData.quotes = [
    //           ...this.quotesViewData.quotes,
    //           ...res.data.quotes
    //         ];
    //       }
    //       // else {
    //       //   return; // this.quotesViewData = res.data;
    //       // }
    //       // console.log(this.quotesViewData.quotes);
    //     })
    // );
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  getFiltered(e) {
    console.log(e);
    this.quotesViewData.quotes = e;
  }
}
