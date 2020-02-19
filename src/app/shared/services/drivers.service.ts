import { Injectable } from "@angular/core";
import { HttpApiService } from "src/app/core/wrapper-service/wrapper-service.service";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class DriversService {
  constructor(private api: HttpApiService) {}
  validateDriverInfo(data): Observable<any> {
    // console.log(data);
    return this.api.post(
      environment.apiUrl + "Insurer/InsurerQuotes/GetDriverDetails",
      data
    );
  }
}
