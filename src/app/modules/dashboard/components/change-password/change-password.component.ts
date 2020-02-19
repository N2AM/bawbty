import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { patternValidator } from "src/app/core/validators/pattern.validator";
import { Router } from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  changePasswordActive: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}
  changePassForm: FormGroup;
  formError;
  submitted: boolean = false;
  ngOnInit() {
    this.changePassForm = this.fb.group({
      currentPassword: ["", [Validators.required]],
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
      confirmPassword: [
        "",
        [
          Validators.required,
          RxwebValidators.compare({ fieldName: "password" })
        ]
      ]
    });
  }
  changePassword() {
    this.changePasswordActive = true;
  }
  get f() {
    return this.changePassForm.controls;
  }
  submit() {
    if (this.changePassForm.invalid) {
      $("html, body").animate(
        {
          scrollTop: $(".ng-invalid").offset().top - 150
        },
        1000
      );
    }
    if (this.changePassForm.valid) {
      this.submitted = true;
      let data = {
        oldPassword: this.changePassForm.controls["currentPassword"].value,
        newPassword: this.changePassForm.controls["password"].value
      };
      this.authService.changePassword(data).subscribe(
        (res: any) => {
          if (res.success) {
            localStorage.clear();
            this.router.navigate(["/auth/login"]);
          } else {
            this.submitted = false;
            this.formError = res.message[0];
            setTimeout(() => {
              this.formError = "";
            }, 2000);
          }
        },
        err => {
          this.submitted = false;
          this.formError = err.message[0];
          setTimeout(() => {
            this.formError = "";
          }, 2000);
        }
      );
    }
  }
}
