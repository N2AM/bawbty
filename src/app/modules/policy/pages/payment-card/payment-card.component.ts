import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
  selector: "app-payment-card",
  templateUrl: "./payment-card.component.html",
  styleUrls: ["./payment-card.component.scss"]
})
export class PaymentCardComponent implements OnInit {
  constructor(private router: Router) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  policy;
  ngOnInit() {
    this.policy = JSON.parse(localStorage.getItem("policy"));
  }
  done() {
    localStorage.removeItem("iban");
    localStorage.removeItem("VIN");
    localStorage.removeItem("Right side");
    localStorage.removeItem("Front");
    localStorage.removeItem("Rear");
    localStorage.removeItem("Left side");
    localStorage.removeItem("check");
    localStorage.removeItem("x_correlation_id");
    localStorage.removeItem("policy");
    localStorage.removeItem("ci");
    this.router.navigate(["/"]);
  }
  print() {
    // this.router.navigate(["/policy/policy-receipt"]);
    // window.open("/policy/policy-receipt", "_self");
    window.open("/policy/policy-receipt", "_self", "");
    setTimeout(() => {
      window.close();
      // window.open("/policy/policy-receipt", "_self").close();
    }, 3000);
  }
  generatePdf() {
    const documentDefinition = {};

    pdfMake.createPdf(documentDefinition).open();
  }
}
