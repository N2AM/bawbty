import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-email-confirmed",
  templateUrl: "./email-confirmed.component.html",
  styleUrls: ["./email-confirmed.component.scss"]
})
export class EmailConfirmedComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  message: string;
  // checkMail = window.open(
  //   "https://bawbty-42078.firebaseapp.com/check-email",
  //   "_blank"
  // );
  ngOnInit() {
    // this.checkMail.close();
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params.userId && params.code)
        this.message = "Email confirmed successfully";
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 3000);
    });
  }
}
