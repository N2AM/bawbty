import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";
import { Router } from "@angular/router";
import { patternValidator } from "src/app/core/validators/pattern.validator";
import * as RegisterActions from "../../../../actions/register.action";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  RegisterationForm: FormGroup;
  formError;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private store: Store<AppState>
  ) {
    // Validators.pattern("^[a-zA-Z ]+$")
    this.RegisterationForm = this.formBuilder.group({
      fullName: [
        "",
        [Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
          this.checkMail
        ]
      ],
      password: [
        "",
        [
          // 1. Password Field is Required
          Validators.required,
          Validators.minLength(8),
          // 2. check whether the entered password has a number
          patternValidator(/\d/, { hasNumber: true }),
          // 3. check whether the entered password has upper case letter
          patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 5. check whether the entered password has a special character
          patternValidator(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
            {
              hasSpecialCharacters: true
            }
          )
          // 6. Has a minimum length of 8 characters
        ]
      ],
      phoneNumber: [
        "",
        [
          Validators.required,
          Validators.min(100000000),
          Validators.pattern("^[5][0-9]*$"),
          this.checkPhone
        ]
      ]
    });
  }

  ngOnInit() {}

  get f() {
    return this.RegisterationForm.controls;
  }
  submit() {
    if (this.RegisterationForm.valid) {
      this.submitted = true;
      // console.log(this.RegisterationForm.getRawValue());
      this.authService.register(this.RegisterationForm.value).subscribe(
        res => {
          // console.log(res);
          if (res.code == 200) {
            // localStorage.setItem("access-token", res.data.userId);
            this.store.dispatch(
              new RegisterActions.Updateregister(
                "+966" + this.RegisterationForm.controls["phoneNumber"].value
              )
            );
            let notVerified = {
              notVerified: true,
              phone:
                "+966" + this.RegisterationForm.controls["phoneNumber"].value
            };
            localStorage.setItem("notVerified", JSON.stringify(notVerified));
            localStorage.setItem(
              "phone",
              "+966" + this.RegisterationForm.controls["phoneNumber"].value
            );
            localStorage.setItem(
              "email",
              this.RegisterationForm.controls["email"].value
            );
            this.router.navigate(["/auth/sms-verification"]);
          } else if (res.code == 400) {
            this.formError = res.message[0];
            this.submitted = false;
            setTimeout(() => {
              this.formError = "";
            }, 2000);
          }
        },
        err => {
          this.formError = err.message[0];
          this.submitted = false;
        }
      );
    }
  }

  checkMail = (control: AbstractControl) => {
    let mailRExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      control.value &&
      mailRExp.test(this.RegisterationForm.controls["email"].value)
    ) {
      this.authService
        .checkuseremail(this.RegisterationForm.controls["email"].value)
        .subscribe(
          (res: any) => {
            // console.log(res.success + "res");
            if (res.success) {
              return { exist: false };
            } else {
              // return { exist: true };
              return this.RegisterationForm.controls["email"].setErrors({
                exist: true
              });
            }
          },
          err => {
            // console.log(err + "err");

            return { exist: true };
          }
        );
    }
  };
  checkPhone = (control: AbstractControl) => {
    if (control.validator) {
      let val = "" + control.value;
      let phoneExp = /^[5][0-9]*$/;
      // console.log(val.length);
      //!control.hasError("min") &&
      // control.value &&
      // control.dirty &&
      if (phoneExp.test(control.value) && val.length == 9) {
        this.authService.checkuserPhone(control.value).subscribe(
          (res: any) => {
            // console.log(res.success + "res");
            if (res.success) {
              return { phoneExist: false };
            } else {
              // return { exist: true };
              return this.RegisterationForm.controls["phoneNumber"].setErrors({
                phoneExist: true
              });
            }
          },
          err => {
            return { phoneExist: true };
          }
        );
      }
    }
  };
}
