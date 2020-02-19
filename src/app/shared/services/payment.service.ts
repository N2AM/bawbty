import { Injectable } from "@angular/core";
import { HttpApiService } from "src/app/core/wrapper-service/wrapper-service.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class PaymentService {
  constructor(private http: HttpApiService) {}
  pay(data) {
    return this.http.post(
      environment.apiUrl + "IntegrationService/Payment",
      data
    );
  }
  paymentResult(
    checkOutId: string,
    ibanNumber: string,
    x_correlation_id: string,
    policyNo: string,
    paymentType: string,
    userId: string,
    BankCode: number
  ) {
    //
    let posDdata = {
      CheckOutId: checkOutId,
      IBANNumber: ibanNumber,
      x_correlation_id: x_correlation_id,
      PolicyNo: policyNo,
      PaymentType: paymentType,
      BankCode: BankCode,
      UserId: userId
    };
    console.log(posDdata);
    return this.http.post(
      environment.apiUrl + "Insurer/InsurerQuotes/GetPaymentStatus",
      posDdata
    );
  }
}
