import { Injectable } from "@angular/core";
import { HttpApiService } from "src/app/core/wrapper-service/wrapper-service.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import * as UserInfoLookUpsActions from "../../actions/userInfo-lookups.action";
import * as vehicleInfoLookupsActions from "../../actions/vehicleInfo-lookups.action";
import { Observable } from "rxjs";
import { Agency } from "../models/agency.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class LookupsService {
  constructor(private api: HttpApiService, private store: Store<AppState>) {}
  getvehicleInfoLookups() {
    this.api
      .get(environment.apiUrl + "Insurer/VehicleInfo/GetVehicleLookups")
      .subscribe(
        res => {
          this.store.dispatch(
            new vehicleInfoLookupsActions.UpdatevehicleInfoLookups(res.data)
          );
        },
        error => {
          // console.log(error);
        }
      );
  }
  getUserInfoLookups() {
    this.api
      .get(environment.apiUrl + "Insurer/UserInfo/GetUserLookups")
      .subscribe(
        res => {
          console.log(res);
          this.store.dispatch(
            new UserInfoLookUpsActions.UpdateUserInfoLookUps(res.data)
          );
        },
        error => {
          // console.log(error);
        }
      );
  }
  getInsuranceAgenciesLookups(x_correlation_id: string) {
    let body = {
      x_correlation_id: x_correlation_id
    };
    return this.api.post(
      environment.apiUrl + "Insurer/InsurerQuotes/GetInsuranceAgencies",
      body
    );
  }
  getAllInsuranceAgenciesLookups() {
    return this.api.get(
      environment.apiUrl + "Insurer/InsurerAgencies/GetAllInsuranceAgencies"
    );
  }
}
