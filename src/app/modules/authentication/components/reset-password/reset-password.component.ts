import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { patternValidator } from "src/app/core/validators/pattern.validator";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";
declare var $: any;

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  resetPassForm: FormGroup;
  submitted: boolean = false;
  userId;
  code;
  sucessmsg;
  formError;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.resetPassForm = this.formBuilder.group({
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
    // this.checkMail.close();
    this.route.queryParams.subscribe(params => {
      // console.log(params);
      if (params) {
        this.userId = params.userId;
        this.code = params.code;
      }
    });
  }
  get f() {
    return this.resetPassForm.controls;
  }
  submit() {
    if (this.resetPassForm.valid && this.userId && this.code) {
      this.submitted = true;
      this.auth
        .resetPassword({
          userId: this.userId,
          code: this.code,
          password: this.resetPassForm.controls["password"].value
        })
        .subscribe(
          (res: any) => {
            // console.log(res);
            if (res.code == 200) {
              $("#myModal").modal("show");
              this.sucessmsg = res.message[0];
              setTimeout(() => {
                $("#myModal").modal("hide");
                this.router.navigate(["/auth/login"]);
              }, 4000);
            } else if (res.code == 400) {
              this.submitted = false;
              this.formError = res.message[0];
              setTimeout(() => {
                this.formError = "";
              }, 3000);
            }
          },
          err => {
            this.submitted = false;
          }
        );
    }
  }
}
