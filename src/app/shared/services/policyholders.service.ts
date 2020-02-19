import { Injectable } from "@angular/core";
import { HttpApiService } from "src/app/core/wrapper-service/wrapper-service.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class PolicyholdersService {
  constructor(private http: HttpApiService) {}

  getPolicyholders() {
    return this.http.get(
      environment.apiUrl +
        "Insurer/PolicyHolders?page_size=" +
        10 +
        "&current_page=" +
        1
    );
  }
  deletePolicyholders(code) {
    return this.http.delete(
      environment.apiUrl + "Insurer/PolicyHolders/" + code
    );
  }
}
