import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
declare var $: any;
import { AuthenticationService } from "../../authentication/authentication.service";
import { TranslateService } from "@ngx-translate/core";
import { Router, NavigationEnd, RouteConfigLoadEnd } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { DashboardService } from "src/app/shared/services/dashboard.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  language: { lang: string; code: string };
  unAuth: boolean = false;
  home: boolean = true;
  fullName;
  constructor(
    private authService: AuthenticationService,
    private translate: TranslateService,
    public router: Router,
    private auth: AuthenticationService,
    private dashboadService: DashboardService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.language = { lang: "EN", code: "en" };
    this.fullName = localStorage.getItem("fullName")
      ? localStorage.getItem("fullName")
      : this.dashboadService.fullName.value;
    this.router.events.subscribe((event: any) => {
      // if (event instanceof RouteConfigLoadEnd) {
      //   // this.loadingRouteConfig = false;
      //   console.log(event.route.path);
      //   if (event.route.path === "") {
      //     // console.log(event.url);
      //     this.home = true;
      //   } else {
      //     this.home = false;
      //   }
      // }
      if (event instanceof NavigationEnd) {
        // console.log(event.url, router.url);
        if (event.url === "/") {
          // console.log(event.url);
          this.home = true;
          // console.log(event.url);
        } else {
          this.home = false;
          // console.log("not", this.home);
        }
      }
      // if (event instanceof RouteConfigLoadEnd) {
      //   console.log(event.route.path);
      //   if (event.route.path === "") {
      //     // console.log(event.url);
      //     this.home = true;
      //   } else {
      //     this.home = false;
      //   }
      // }
      // console.log(this.home);
    });
  }

  ngOnInit() {
    this.auth.isAuth.subscribe(res => {
      if (
        res !== null ||
        (localStorage.getItem("access-token") &&
          localStorage.getItem("fullName"))
      ) {
        this.unAuth = false;
        this.fullName = localStorage.getItem("fullName")
          ? localStorage.getItem("fullName")
          : res.fullName;
      } else {
        this.unAuth = true;
      }
    });
    this.dashboadService.fullName.subscribe(res => {
      this.fullName = res ? res : localStorage.getItem("fullName");
    });
    // }
    $("#nav-icon").click(function() {
      $(this).toggleClass("open");
      $("#nav-links").toggleClass("d-block");
      $(".overlayed").toggleClass("d-block");
    });
    $("#menu-btn").click(function() {
      $(this).toggleClass("on");
      $("#nav-links").toggleClass("d-block");
      $(".overlayed").toggleClass("d-block");
    });
    $(".overlayed").click(function() {
      $("#menu-btn").removeClass("on");
      $("#nav-links")
        .removeClass("d-block")
        .addClass("d-none");
      $(this)
        .removeClass("d-block")
        .addClass("d-none");
    });

    // window.addEventListener("click", function(e) {
    //   if (document.getElementById("clickbox").contains(e.target)) {
    //     // Clicked in box
    //   } else {
    //     // Clicked outside the box
    //   }
    // });

    // The debounce function receives our function as a parameter
    const debounce = fn => {
      // This holds the requestAnimationFrame reference, so we can cancel it if we wish
      let frame;

      // The debounce function returns a new function that can receive a variable number of arguments
      return (...params) => {
        // If the frame variable has been defined, clear it now, and queue for next frame
        if (frame) {
          cancelAnimationFrame(frame);
        }

        // Queue our function call for the next frame
        frame = requestAnimationFrame(() => {
          // Call our function and pass any params we received
          fn(...params);
        });
      };
    };

    // Reads out the scroll position and stores it in the data attribute
    // so we can use it in our stylesheets
    const storeScroll = () => {
      document.documentElement.dataset.scroll = window.scrollY.toString();
    };

    // Listen for new scroll events, here we debounce our `storeScroll` function
    document.addEventListener("scroll", debounce(storeScroll), {
      passive: true
    });

    // Update scroll position for first time
    storeScroll();
  }
  // scroll() {
  //   document
  //     .getElementById("how-it-works")
  //     .scrollIntoView({ block: "start", behavior: "smooth" });
  // }
  // login() {
  //   // this.authService.login();
  //   // console.log("loggin");
  // }
  // signout() {
  //   this.authService.signout();
  // }

  signOut() {
    // if (!isPlatformBrowser(this.platformId)) {
    localStorage.clear();
    // }
    this.auth.isAuth.next(null);
    this.auth.signOut().subscribe(res => {
      // console.log(res);
      if (res) {
        this.router.navigate(["/"]);
        this.unAuth = true;
      }
    });
  }
  useLanguage(lang) {
    this.translate.use(lang);
    if (lang == "ar") {
      this.language.lang = "عربي";
      this.language.code = "ar";
    } else {
      this.language.lang = "EN";
      this.language.code = "en";
    }
    // console.log(this.translate.currentLang);
    $("html").attr("lang", lang);
    return lang;
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.fullName = localStorage.getItem("fullName");
  }
}
