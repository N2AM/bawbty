import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  formError;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ]
      ],
      password: ["", [Validators.required]]
    });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.loginForm.valid) {
      this.loading = true;
      this.authenticationService.loginbyemail(this.loginForm.value).subscribe(
        (res: any) => {
          // console.log(res);
          if (res.code === null) {
            if (res.data.isPhoneNumberVerified) {
              console.log(res.data.isPhoneNumberVerified);
              // if (!isPlatformBrowser(this.platformId)) {
              localStorage.setItem("access-token", res.data.accessToken);
              localStorage.setItem("fullName", res.data.fullName);
              this.authenticationService.isAuth.next({
                accessToken: res.data.accessToken,
                fullName: res.data.fullName
              });
              // }
              if (localStorage.getItem("nextRoute")) {
                this.router.navigate([localStorage.getItem("nextRoute")]);
              } else {
                this.router.navigate(["/"]);
              }
            } else {
              this.formError = res.message[0];
              setTimeout(() => {
                this.router.navigate(["/auth/sms-verification"]);
              }, 1000);
              localStorage.setItem(
                "email",
                this.loginForm.controls["email"].value
              );
              localStorage.setItem("notVerified", "true");
              localStorage.setItem("phone", res.data.phoneNumber);
            }
          } else {
            this.formError = res.message[0];
            if (res.code == "UmLoEr02") {
              // console.log("att 10");
              this.loading = true;
              setTimeout(() => {
                this.formError = "";
                this.loading = false;
              }, 1000);
            } else {
              this.loading = false;
            }
          }
        },
        err => {
          console.log("sss");
          this.formError = err.message[0];
          setTimeout(() => {
            this.formError = "";
            this.loading = false;
          }, 1000);
          if (err.code == "UmLoEr02") {
            // console.log("att 10");
            this.loading = true;
            setTimeout(() => {
              this.formError = "";
              this.loading = false;
            }, 1000);
          } else {
            this.loading = false;
          }
        }
      );
    }

    // this.loading = true;
    // this.authenticationService.login();
    // .pipe(first())
    // .subscribe(
    //   data => {
    //     this.router.navigate([this.returnUrl]);
    //   },
    //   error => {
    //     this.loading = false;
    //   }
    // );
  }
}
