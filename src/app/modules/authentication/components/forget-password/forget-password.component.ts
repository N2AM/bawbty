import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"]
})
export class ForgetPasswordComponent implements OnInit {
  forgetPassForm: FormGroup;
  formError;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.forgetPassForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ]
      ]
    });
  }
  get f() {
    return this.forgetPassForm.controls;
  }
  submit() {
    if (this.forgetPassForm.valid) {
      this.submitted = true;
      this.auth.forgetPasswordsendMail(this.forgetPassForm.value).subscribe(
        (res: any) => {
          if (res.code == 200) {
            this.router.navigate(["/auth/check-email"]);
          } else if (res.code == 400) {
            this.submitted = false;
            this.formError = res.message[0];
            setTimeout(() => {
              this.formError = "";
            }, 4000);
          }
        },
        err => {
          this.submitted = false;
        }
      );
    }
  }
}
