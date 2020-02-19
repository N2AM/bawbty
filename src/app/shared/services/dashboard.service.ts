import { Injectable } from "@angular/core";
import { HttpApiService } from "src/app/core/wrapper-service/wrapper-service.service";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  fullName = new BehaviorSubject(null);
  constructor(private http: HttpApiService) {}
  getDashboard() {
    return this.http.get(
      environment.apiUrl + "Insurer/InsurerQuotes/GetUserDahsboard"
    );
  }

  getUserProfile() {
    return this.http.get(environment.apiUrl + "Account/Profile");
  }
  updateUserProfile(body) {
    return this.http.put(environment.apiUrl + "Account/Profile", body);
  }
}
