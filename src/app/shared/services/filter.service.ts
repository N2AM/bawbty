import { Injectable } from "@angular/core";
import { HttpApiService } from "src/app/core/wrapper-service/wrapper-service.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class FilterService {
  constructor(private api: HttpApiService) {}

  getInsuranceAgencies(): Observable<any> {
    return this.api.get(
      environment.apiUrl + "Insurer/InsurerQuotes/GetInsuranceAgencies"
    );
  }
}
