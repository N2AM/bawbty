import { Component, OnInit } from "@angular/core";
import * as jspdf from "jspdf";
import * as $ from "jquery";
import html2canvas from "html2canvas";
import { Policy } from "src/app/shared/models/policy.model";
import { Router } from "@angular/router";
@Component({
  selector: "app-receipt",
  templateUrl: "./receipt.component.html",
  styleUrls: ["./receipt.component.scss"]
})
export class ReceiptComponent implements OnInit {
  constructor(private router: Router) {
    this.policy = JSON.parse(localStorage.getItem("policy"));
  }
  policy: Policy;
  ngOnInit() {
    var data = document.getElementById("contentToConvert");
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var scaleBy = 5;
      var HTML_Width = $("#contentToConvert").width();
      var HTML_Height = $("#contentToConvert").height();
      var top_left_margin = 15;
      var PDF_Width = HTML_Width + top_left_margin * 2;
      var PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;

      var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

      html2canvas($("#contentToConvert")[0], {
        allowTaint: true
      }).then(function(canvas) {
        canvas.getContext("2d");
        var context = canvas.getContext("2d");
        context.scale(scaleBy, scaleBy);
        console.log(canvas.height + "  " + canvas.width);
        // var x = parseFloat(v.toFixed(2));
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = jspdf("p", "pt", [PDF_Width, PDF_Height]);
        pdf.addImage(
          imgData,
          "JPG",
          top_left_margin,
          top_left_margin,
          canvas_image_width,
          canvas_image_height
        );
        for (var i = 1; i <= totalPDFPages; i++) {
          pdf.addPage(PDF_Width, PDF_Height);
          pdf.addImage(
            imgData,
            "JPG",
            top_left_margin,
            -(PDF_Height * i) + top_left_margin * 4,
            canvas_image_width,
            canvas_image_height
          );
        }

        if (typeof window.orientation !== "undefined") {
          console.log("mob");
          window.open(jspdf.output("Policy-Receipt.pdf"));
        } else {
          console.log("com");
          pdf.save("Policy-Receipt.pdf");
        }
        // pdf.save("Policy-Receipt.pdf");
      });
    });
    // window.open("/policy/policy-receipt", "_self", "").close();
    setTimeout(() => {
      this.router.navigate(["/policy/policy-summary"]);
    }, 1000);
  }
}
