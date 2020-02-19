import { Injectable } from "@angular/core";
import { HttpApiService } from "src/app/core/wrapper-service/wrapper-service.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import * as QuotesActions from "../../actions/get-quotes.action";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class QuotesService {
  constructor(private api: HttpApiService, private store: Store<AppState>) {}
  getQuotes(data) {
    this.store.dispatch(new QuotesActions.AddGetQuotes(data));
    return this.api.post(
      environment.apiUrl + "Insurer/InsurerQuotes/GetQuotes",
      data
    );
  }

  getQuotesByFilter(data) {
    console.log(data);
    return this.api.post(
      environment.apiUrl + "Insurer/InsurerQuotes/GetQuotesByFilter",
      data
    );
  }
}
