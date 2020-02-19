import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import * as $ from "jquery";
import { TranslateService } from "@ngx-translate/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-insurance-forms",
  templateUrl: "./insurance-forms.component.html",
  styleUrls: ["./insurance-forms.component.scss"]
})
export class InsuranceFormsComponent implements OnInit {
  constructor(private translate: TranslateService, private router: Router) {}
  form: boolean = true;
  ngOnInit() {
    // this.translate.onLangChange.subscribe()
  }

  moveToSelectedTab(i: any) {
    if (i.e > i.c) {
      // console.log(i.e);
      $(".mat-tab-label:nth-child(" + i.e + ") img.mx-2").attr(
        "src",
        "../../../../../assets/icons/tab-done.svg"
      );
      $(".mat-tab-label:nth-child(" + (i.e + 1) + ") img.mx-2").attr(
        "src",
        "../../../../../assets/icons/current-tab.svg"
      );
      $(".mat-tab-label:nth-child(" + i.e + ") img.mt-2").attr(
        "src",
        "../../../../../assets/icons/separator-done.png"
      );
    } else {
      $(".mat-tab-label:nth-child(" + (i.e + 1) + ") img.mx-2").attr(
        "src",
        "../../../../../assets/icons/current-tab.svg"
      );
      $(".mat-tab-label:nth-child(" + (i.e + 1) + ") img.mt-2").attr(
        "src",
        "../../../../../assets/icons/separator.svg"
      );
      $(".mat-tab-label:nth-child(" + (i.e + 2) + ") img.mx-2").attr(
        "src",
        "../../../../../assets/icons/inactive-tab.svg"
      );
    }
    $(".mat-tab-label:nth-child(" + (i.e + 1) + ")").click();
    window.scroll(0, 0);
  }

  viewQuotes(event) {
    // console.log();
    this.form = event;
  }
}
