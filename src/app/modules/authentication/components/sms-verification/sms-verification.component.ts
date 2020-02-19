import { Component, OnInit, ViewChild } from "@angular/core";
import { CountdownComponent } from "ngx-countdown";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-sms-verification",
  templateUrl: "./sms-verification.component.html",
  styleUrls: ["./sms-verification.component.scss"]
})
export class SmsVerificationComponent implements OnInit {
  @ViewChild("cd", { static: false }) private countdown: CountdownComponent;

  smscode;
  countHide: boolean = false;
  phone;
  submitted = false;
  formError: string;
  verifyForm: FormGroup;
  counter = 1;
  constructor(
    private auth: AuthenticationService,
    private store: Store<AppState>,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // this.store.select("register").subscribe(res => {
    //   this.phone = res;
    // });
    this.phone = JSON.parse(localStorage.getItem("notVerified")).phone
      ? JSON.parse(localStorage.getItem("notVerified")).phone
      : localStorage.getItem("phone");
  }

  ngOnInit() {
    this.verifyForm = this.formBuilder.group({
      smsCode: [
        "",
        [Validators.required, Validators.min(100000), Validators.max(999999)]
      ]
    });
  }
  handleEvent(e) {
    if (e.left === 0) {
      if (this.counter < 3) {
        this.counter = this.counter + 1;
        console.log(this.counter);
        this.auth.resendCode(this.phone).subscribe(res => {
          this.countHide = false;
        });
      }
      this.countHide = true;
    }
  }
  get f() {
    return this.verifyForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(
      this.verifyForm.controls["smsCode"].value,
      this.verifyForm.value
    );
    if (
      this.verifyForm.controls["smsCode"].value &&
      localStorage.getItem("email")
    ) {
      this.auth
        .verifySms(
          localStorage.getItem("email"),
          this.verifyForm.controls["smsCode"].value
        )
        .subscribe(
          (res: any) => {
            if (res.code == 200) {
              localStorage.removeItem("notVerified");
              localStorage.clear();
              this.router.navigate(["/auth/login"]);
              console.log(res);
            } else if (res.code == 400) {
              this.submitted = false;
              console.log(res.message[0]);
              this.formError = res.message[0];
              setTimeout(() => {
                this.formError = "";
              }, 3000);
            }
          },
          err => {
            this.formError = err.message[0];
            this.submitted = false;
          }
        );
    }
  }
}
