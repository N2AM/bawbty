import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as $ from "jquery";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  userProfile;
  edit: boolean = false;
  submitted: boolean = false;
  editProfileForm: FormGroup;
  formError;
  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.dashboardService.getUserProfile().subscribe((res: any) => {
      this.userProfile = res.data;
    });
    // if (this.edit) {
    this.editProfileForm = this.fb.group({
      fullName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]]
    });
    // }
  }
  get f() {
    return this.editProfileForm.controls;
  }
  submitProfile() {
    if (this.editProfileForm.invalid) {
      $("html, body").animate(
        {
          scrollTop: $(".ng-invalid").offset().top - 150
        },
        1000
      );
    }
    if (this.editProfileForm.valid) {
      this.submitted = true;
      console.log(this.editProfileForm.value);
      this.dashboardService
        .updateUserProfile(this.editProfileForm.value)
        .subscribe(
          res => {
            if (res.success) {
              this.userProfile = res.data;
              localStorage.setItem("fullName", this.userProfile.fullName);
              this.dashboardService.fullName.next(this.userProfile.fullName);
              this.edit = false;
              this.submitted = false;
            } else {
              this.submitted = false;
            }
            console.log(res);
          },
          err => {
            console.log(err);
            this.submitted = false;
          }
        );
    }
  }
}
