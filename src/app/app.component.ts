import { Component, OnInit, HostListener } from "@angular/core";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  ActivatedRoute,
  RouterOutlet,
  NavigationCancel
} from "@angular/router";
import { slideInAnimation } from "./animations/animations";
import { TranslateService } from "@ngx-translate/core";
import { RouteConfigLoadEnd } from "@angular/router";
import { RouteConfigLoadStart } from "@angular/router";
import * as $ from "jquery";
import { CheckVersionsService } from "./shared/services/check-versions.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class AppComponent implements OnInit {
  title = "Bawbty";
  hideFooter: boolean = false;
  hideHeader: boolean = false;
  home: boolean = true;
  loading: boolean = false;
  asyncLoadCount;
  loadingRouteConfig: boolean;

  constructor(
    private translate: TranslateService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private versionCheckService: CheckVersionsService
  ) {
    translate.setDefaultLang("en");
    // window.addEventListener("scroll", function() {
    //   var elementTarget = document.getElementById("mainSlider");
    //   if (
    //     window.scrollY >
    //     elementTarget.offsetTop + elementTarget.offsetHeight
    //   ) {
    //     this.router.
    //   }
    // });
  }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }

      if (event instanceof NavigationEnd) {
        if (event.url === "") {
          this.home = true;
        } else {
          this.home = false;
        }
        if (event.url == "/auth/login" || event.url == "/auth/sign-up") {
          this.hideFooter = true;
          this.hideHeader = true;
        } else {
          this.hideFooter = false;
          this.hideHeader = false;
        }
        if (
          event.url == "/auth/check-email" ||
          event.url == "/auth/reset-password" ||
          event.url == "/auth/forget-password" ||
          event.url == "/auth/sms-verification" ||
          event.url == "/auth/email-confirmed" ||
          event.url == "/404" ||
          event.url.indexOf("/auth/email-confirmed") > -1 ||
          event.url.indexOf("/auth/reset-password") > -1
        ) {
          this.hideFooter = true;
          $("#menu-btn").removeClass("on");
          $("#nav-links")
            .removeClass("d-block")
            .addClass("d-none");
          $(".overlayed")
            .removeClass("d-block")
            .addClass("d-none");
        }
        this.loading = false;
      }

      if (event instanceof NavigationError) {
        this.loading = false;
      }
      if (event instanceof NavigationCancel) {
        this.loading = false;
      }
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        if (event.route.path === "") {
          this.home = true;
        } else {
          this.home = false;
        }
        this.loadingRouteConfig = false;
      }
    });

    // this.activatedRoute.url.subscribe(url => {
    //   console.log(url);
    // });
    // document.addEventListener("contextmenu", function(e) {
    //   e.preventDefault();
    // });
    // document.onkeydown = function(e) {
    //   if (e.keyCode == 123) {
    //     e.preventDefault();
    //     return false;
    //   }
    //   if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    //     e.preventDefault();
    //     return false;
    //   }
    //   if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    //     e.preventDefault();
    //     return false;
    //   }
    //   if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    //     e.preventDefault();
    //     return false;
    //   }
    //   if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    //     e.preventDefault();
    //     return false;
    //   }
    // };
  }
  onScroll(event: Event) {
    console.log(event);
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }
}
