import { Component, OnInit } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
  NavigationError
} from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  hide: boolean = false;
  constructor(public router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        // console.log(event.url);

        if (event.url === "/") {
          // console.log(event.url);s
          this.hide = false;
          // $("app-footer").css("background-color", "#1b1b1b");
        } else {
          this.hide = true;
          // $("app-footer").css("background-color", "#018064");
        }
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        //console.log(event.error);
      }
    });
  }
  ngOnInit() {}
}
