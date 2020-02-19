import { Injectable } from "@angular/core";
import { HttpApiService } from "src/app/core/wrapper-service/wrapper-service.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class VehiclesService {
  constructor(private http: HttpApiService) {}
  getVehicles() {
    return this.http.get(
      environment.apiUrl +
        "Insurer/Vehicles?page_size=" +
        10 +
        "&current_page=" +
        1
    );
  }
  deleteVehicles(code) {
    return this.http.delete(environment.apiUrl + "Insurer/Vehicles/" + code);
  }
}
