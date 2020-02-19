import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  Input,
  SimpleChanges
} from "@angular/core";
import { CountdownComponent } from "ngx-countdown";
import { Policy } from "src/app/shared/models/policy.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-policy-details",
  templateUrl: "./policy-details.component.html",
  styleUrls: ["./policy-details.component.scss"]
})
export class PolicyDetailsComponent implements OnInit {
  @ViewChild("cd", { static: false }) private countdown: CountdownComponent;
  @Output() ibanEmitter = new EventEmitter<any>();
  @Input() continue;
  @Input() ibanVal;
  @Input() payCheck;
  @Input() policy;
  checkUploaded = false;
  policyId;
  imgs = [
    {
      id: "0",
      label: "Front",
      value: "front",
      defaultImg: "../../../../../assets/icons/front-veh-ic.svg"
    },
    {
      id: "1",
      label: "Rear",
      value: "rear",
      defaultImg: "../../../../../assets/icons/rear-veh-ic.svg"
    },
    {
      id: "2",
      label: "Right side",
      value: "rightSide",
      defaultImg: "../../../../../assets/icons/rightside-veh-ic.svg"
    },
    {
      id: "3",
      label: "Left side",
      value: "leftSide",
      defaultImg: "../../../../../assets/icons/leftside-veh-ic.svg"
    },
    {
      id: "4",
      value: "vin",
      label: "VIN",
      defaultImg: "../../../../../assets/icons/vin-veh-ic.svg"
    }
  ];
  ibanForm: FormGroup;
  countTime = 0;
  bank;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    //   var today = new Date();
    //  time today.getHours() + 12;
    //   console.log(today.getHours() + 12);
    // this.store.select("policy").subscribe(res => {
    //   this.policy = res;
    //   console.log(this.policy);
    // });
    this.ibanForm = this.formBuilder.group({
      iban: [
        { value: this.ibanVal, disabled: this.payCheck },
        [
          Validators.required,
          Validators.minLength(22),
          Validators.maxLength(22),
          Validators.pattern("^[0-9]*$")
        ]
      ],
      imgscheck: [
        { value: "", disabled: this.payCheck },
        [
          control => {
            // console.log(control.value);
            return !control.value == true ? { required: true } : null;
          }
        ]
      ]
    });

    this.policyId = localStorage.getItem("policyId");

    this.ibanForm.valueChanges.subscribe(res => {
      let st = this.ibanForm.controls["iban"].value.substring(2, 4);
      if (st.substring(2, 3) === "0") {
        this.bank = "JPMorgan Chase Bank,N.A.";
        localStorage.setItem("bc", "0");
      } else if (st.substring(0, 1) === "5" && st !== "55") {
        this.bank = "AL INMA BANK";
        localStorage.setItem("bc", "5");
      } else if (st == 50) {
        this.bank = "SAUDI HOLLANDI BANK";
        localStorage.setItem("bc", "50");
      } else if (st == 15) {
        this.bank = "BANK AL BILAD";
        localStorage.setItem("bc", "15");
      } else if (st == 30) {
        this.bank = "ARAB NATIONAL BANK";
        localStorage.setItem("bc", "30");
      } else if (st == 60) {
        this.bank = "BANK AL-JAZIRA";
        localStorage.setItem("bc", "60");
      } else if (st == 76) {
        this.bank = "BANK MUSCAT";
        localStorage.setItem("bc", "76");
      } else if (st == 85) {
        this.bank = "BNP PARIBAS SAUDI ARABIA";
        localStorage.setItem("bc", "85");
      } else if (st == 55) {
        this.bank = "BANQUE SAUDI FRANSI";
        localStorage.setItem("bc", "55");
      } else if (st == 95) {
        this.bank = "EMIRATES BANK INTERNATIONAL PJSC";
        localStorage.setItem("bc", "95");
      } else if (st == 90) {
        this.bank = "GULF INTERNATIONAL BANK B.S.C., RIY";
        localStorage.setItem("bc", "90");
      } else if (st == 71) {
        this.bank = "NATIONAL BANK OF BAHRAIN";
        localStorage.setItem("bc", "71");
      } else if (st == 75) {
        this.bank = "NATIONAL BANK OF KWIT";
        localStorage.setItem("bc", "75");
      } else if (st == 82) {
        this.bank = "NATIONAL BANK OF PAKISTAN";
        localStorage.setItem("bc", "82");
      } else if (st == 10) {
        this.bank = "NATIONAL COMMERCIAL BANK";
        localStorage.setItem("bc", "10");
      } else if (st == 84) {
        this.bank = "T.C.Ziraat Bankasi";
        localStorage.setItem("bc", "84");
      } else if (st == 20) {
        this.bank = "RIYAD BANK";
        localStorage.setItem("bc", "20");
      } else if (st == 80) {
        this.bank = "ALRAJHI BANKING AND INVESTMENT CORP";
        localStorage.setItem("bc", "80");
      } else if (st == 45) {
        this.bank = "SAUDI BRITISH BANK";
        localStorage.setItem("bc", "45");
      } else if (st == 40) {
        this.bank = "SAMBA FINANCIAL GROUP";
        localStorage.setItem("bc", "40");
      } else if (st == 83) {
        this.bank = "State Bank of India";
        localStorage.setItem("bc", "83");
      } else if (st == 65) {
        this.bank = "SAUDI INVESTMENT BANK";
        localStorage.setItem("bc", "65");
      } else {
        this.bank = "";
        this.ibanForm.controls["iban"].setErrors({
          bank: { bankCode: "invalid IBAN" }
        });
      }
      if (this.ibanForm.controls["iban"].valid) {
        console.log(
          this.ibanForm.controls["iban"].value.replace(/\s/g, ""),
          this.policy.PolicyDetails.InsuranceType
        );
        if (this.policy.PolicyDetails.InsuranceType === "Comprehensive") {
          console.log(this.ibanForm.value);
          if (
            localStorage.getItem("VIN") &&
            localStorage.getItem("Right side") &&
            localStorage.getItem("Front") &&
            localStorage.getItem("Rear") &&
            localStorage.getItem("Left side")
          ) {
            this.ibanEmitter.emit({
              iban: this.ibanForm.controls["iban"].value.replace(/\s/g, ""),
              imgsCheck: this.ibanForm.controls["imgscheck"].value
            });
            this.checkUploaded = false;
          } else {
            this.ibanEmitter.emit({
              iban: this.ibanForm.controls["iban"].value.replace(/\s/g, ""),
              imgsCheck: this.ibanForm.controls["imgscheck"].value
            });
            this.checkUploaded = true;
          }
        } else if (this.policy.PolicyDetails.InsuranceType === "TPL") {
          console.log(this.ibanForm.value);
          this.ibanEmitter.emit({
            iban: this.ibanForm.controls["iban"].value.replace(/\s/g, ""),
            imgsCheck: true
          });
        } else {
          this.ibanEmitter.emit();
        }
      } else if (this.ibanForm.controls["iban"].invalid) {
        this.ibanEmitter.emit();
      }
      // }
    });
  }
  ngAfterViewInit(): void {
    // $("#iban").keyup(function() {
    //   $(this).val(
    //     $(this)
    //       .val()
    //       .replace(/(\d{4})(\d+)/g, "$1 $2")
    //   );
    // });
  }
  get f() {
    return this.ibanForm.controls;
  }
  checkingImgs(e) {
    if (e.checked == true) {
      this.checkUploaded = true;
    } else {
      this.checkUploaded = false;
    }
  }
  ibanInserted() {
    // console.log(this.ibanForm.controls["iban"].value);
    if (
      this.ibanForm.controls["iban"].valid &&
      this.ibanForm.controls["imgscheck"].valid
    ) {
      console.log(this.ibanForm.controls["iban"].value);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.continue);
    // if (this.continue) {
    // console.log(this.payCheck);
    if (this.ibanForm && this.ibanForm.controls["iban"].valid) {
      console.log(
        this.ibanForm.controls["iban"].value.replace(/\s/g, ""),
        this.policy.PolicyDetails.InsuranceType
      );
      if (this.policy.PolicyDetails.InsuranceType === "Comprehensive") {
        console.log(this.ibanForm.value);
        if (
          localStorage.getItem("VIN") &&
          localStorage.getItem("Right side") &&
          localStorage.getItem("Front") &&
          localStorage.getItem("Rear") &&
          localStorage.getItem("Left side")
        ) {
          this.ibanEmitter.emit({
            iban: this.ibanForm.controls["iban"].value.replace(/\s/g, ""),
            imgsCheck: this.ibanForm.controls["imgscheck"].value
          });
          this.checkUploaded = false;
        } else {
          this.ibanEmitter.emit({
            iban: this.ibanForm.controls["iban"].value.replace(/\s/g, ""),
            imgsCheck: this.ibanForm.controls["imgscheck"].value
          });
          this.checkUploaded = true;
        }
      } else if (this.policy.PolicyDetails.InsuranceType === "TPL") {
        console.log(this.ibanForm.value);
        this.ibanEmitter.emit({
          iban: this.ibanForm.controls["iban"].value.replace(/\s/g, ""),
          imgsCheck: true
        });
      } else {
        this.ibanEmitter.emit();
      }
    } else {
      this.ibanEmitter.emit();
    }
    // if (this.payCheck) {
    //   this.ibanForm.disable();
    // }
  }
}
