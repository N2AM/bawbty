import {
  Component,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  ViewChild,
  Input
} from "@angular/core";
import * as $ from "jquery";
import { QuotesService } from "src/app/shared/services/quotes.service";
import { GetQuotesByFilter } from "src/app/shared/models/getQuotesByFilter.model";
import { Quote } from "@angular/compiler";
import {
  MatSelectionList,
  MatSelectionListChange,
  MatListOption
} from "@angular/material";
import { LookupsService } from "src/app/shared/services/lookups.service";
import * as _ from "lodash";
@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"]
})
export class FilterComponent implements OnInit, OnChanges {
  constructor(
    private quotesService: QuotesService,
    private insuranceServices: LookupsService
  ) {}
  @Output() maintenanceCenter = new EventEmitter();
  @Output() insuranceType = new EventEmitter();
  @Output() deductible = new EventEmitter();
  @Output() agencies = new EventEmitter();
  @Input() insuranceTypes;
  @Input() maintenanceCenters;
  @Input() x_cor;
  deductibles;
  agenciesList;

  @Output() quotesData = new EventEmitter();
  quotesViewData: Quote;

  deductibleEvent;
  agencyEvent;

  @Input() quotesFilter: GetQuotesByFilter;
  @Input() deselectAll;
  // public defaultSelected = 0;
  ngOnInit() {
    this.getInsuranceAgencies(this.x_cor);
  }
  ngOnChanges() {
    // changes.deselectAll contains the old and the new value...
    // console.log(this.deselectAll);
    if (this.deductibleEvent) {
      // console.log(this.deductibleEvent);
      if (this.deselectAll === true) {
        // console.log(this.deductibleEvent);
        this.deductibleEvent.source.deselectAll();
        // console.log(this.agencyEvent);
        // this.getQuotesByFilter(this.quotesFilter);
      }
    } else if (this.agencyEvent) {
      console.log(this.deductibleEvent);
      if (this.deselectAll === true) {
        // console.log(this.deductibleEvent);
        // console.log(this.agencyEvent);
        this.agencyEvent.source.deselectAll();
        // this.getQuotesByFilter(this.quotesFilter);
      }
    }
  }
  getInsuranceAgencies(x) {
    this.insuranceServices.getInsuranceAgenciesLookups(x).subscribe(
      (res: any) => {
        console.log(res);
        // this.deductibles = res.data.deductible_details;
        this.agenciesList = res.data.agencies_details;
        this.deductibles = [].concat
          .apply(
            [],
            res.data.agencies_details.map(u => u.deductible)
          )
          .filter(s => s !== null);

        console.log(this.deductibles);
      },
      error => {
        // console.log(error);
      }
    );
  }
  // getMaintenanceCenter(id) {
  //   this.maintenanceCenter.emit(id);
  //   let filterVal = {
  //     maintenance_center: id
  //   };
  //   this.quotesFilter.maintenance_center = filterVal.maintenance_center;
  //   // console.log(this.quotesFilter);
  //   this.getQuotesByFilter(this.quotesFilter);
  // }
  getInsuranceType(id: number) {
    this.insuranceType.emit(id);
    let filterVal = {
      insurance_type: id
    };
    this.quotesFilter.insurance_type = filterVal.insurance_type;
    // console.log(this.quotesFilter);
    this.getQuotesByFilter(this.quotesFilter);
  }
  onDeductibleSelection(event, values) {
    this.deductibleEvent = event;
    console.log(this.deductibleEvent);
    if (event.option.selected) {
      event.source.deselectAll();
      event.option._setSelected(true);
    }
    // console.log(values);
    let selected = 0;
    for (const item of values) {
      //// console.log(item.value);
      selected = item.value;
    }
    let filterVal = {
      deductible: selected
    };
    this.quotesFilter.deductible = filterVal.deductible;
    // console.log(this.quotesFilter);
    this.getQuotesByFilter(this.quotesFilter);
  }
  onAgencySelection(event: MatSelectionListChange, values) {
    // console.log(event);
    // console.log(event.source._value);
    this.agencyEvent = event;
    this.quotesFilter = {
      ...this.quotesFilter,
      insurance_agencies: event.source._value
    };
    this.getQuotesByFilter(this.quotesFilter);

    // console.log(this.quotesFilter);
  }
  getQuotesByFilter(v) {
    this.quotesService.getQuotesByFilter(v).subscribe((res: any) => {
      this.quotesData.emit(res.data.quotes);
      // console.log(res);
    });
  }
}
