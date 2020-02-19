import { Injectable } from "@angular/core";
import { HttpApiService } from "src/app/core/wrapper-service/wrapper-service.service";
import { HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class PolicyService {
  constructor(private api: HttpApiService) {}

  getPolicyDetails(
    id: number,
    additionalBenefits: any[],
    x_correlation_id: any,
    DeductibleAmount: number
  ) {
    let d = {
      PolicyNo: "" + id,
      x_correlation_id: x_correlation_id,
      additionalBenefits: additionalBenefits,
      DeductibleAmount: DeductibleAmount
    };
    return this.api.post(
      environment.apiUrl + "Insurer/InsurerQuotes/GetPolicyDetails",
      d
    );
  }
  postVehicleImgs(data) {
    console.log(data);
    return this.api.post(
      environment.apiUrl + "Insurer/InsurerQuotes/UploadVehicleImages",
      data
    );
  }
}
