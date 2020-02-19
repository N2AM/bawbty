import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { QuoteModel } from "src/app/shared/models/quoteModel.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import * as ComparedItemsActions from "../../../../actions/compared-items.action";
import { Router } from "@angular/router";

@Component({
  selector: "app-compared-items",
  templateUrl: "./compared-items.component.html",
  styleUrls: ["./compared-items.component.scss"]
})
export class ComparedItemsComponent implements OnInit, OnChanges {
  @Input() comparedItems: QuoteModel[];
  public isViewable: boolean;
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnChanges() {}
  ngOnInit() {
    // console.log(this.comparedItems.length);
    // this.store.select("comparedItems").subscribe(res => {
    //   console.log(res);
    //   if (res.length > 0) {
    //     this.comparedItems = res;
    //   }
    // });
    // this.isViewable = true;
    // this.store.select("comparedItems").subscribe(res => {
    //   if (res.length > 0) {
    //     this.comparedItems = res;
    //   }
    // });
  }
  removeComparedItem(item) {
    this.store.dispatch(new ComparedItemsActions.RemoveComparedItems(item));
    // this.store.dispatch(new ComparedItemsActions.UpdateComparedItems(item));
  }
  removeAllComparedItems() {
    this.store.dispatch(new ComparedItemsActions.RemoveAllComparedItems());
  }
  compare() {
    localStorage.setItem("ci", JSON.stringify(this.comparedItems));
    this.router.navigate(["/quotes/compare-quotes"]);
  }
}
