import { Injectable } from "@angular/core";
import { HttpApiService } from "src/app/core/wrapper-service/wrapper-service.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class PoliciesService {
  constructor(private http: HttpApiService) {}

  getPolicies(currentpage) {
    return this.http.get(
      environment.apiUrl +
        "Insurer/InsurerQuotes/policies" +
        "?page_size=2&current_page=" +
        currentpage
    );
  }
  getPoliciesByFilter(currentpage, status) {
    return this.http.get(
      environment.apiUrl +
        "Insurer/InsurerQuotes/policies" +
        "?page_size=2&current_page=" +
        currentpage +
        "&status=" +
        status
    );
  }
}
