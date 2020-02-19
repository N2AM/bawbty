import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpApiService } from "src/app/core/wrapper-service/wrapper-service.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class BasicInfoService {
  constructor(private api: HttpApiService, private store: Store<AppState>) {}
  postBasicInfo(data): Observable<any> {
    // console.log(data);
    return this.api.post(
      environment.apiUrl + "Insurer/InsurerQuotes/GetUserInfo",
      data
    );
  }
}
