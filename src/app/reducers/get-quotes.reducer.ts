import * as GetQuotesActions from "./../actions/get-quotes.action";
import * as moment from "moment";
import { GetQuotes } from "../shared/models/getQuotes.model";
import { retry } from "rxjs/operators";

// const initialState: GetQuotes = {
//   registration_type: 0,
//   purpose_of_insurance: 0,
//   owner_national_id: "",
//   // sequence_number: "",
//   // custom_number: "",
//   VehicleID: 0,
//   insured_national_id: "",
//   policy_effective_date: "",
//   date_of_birth: "",
//   manifucture_year: 1960,
//   Education_qualification: "",
//   children_below_16: 0,
//   license_type: "",
//   Traffic_violations: [],
//   Medical_conditions: [],
//   drivers: [],
//   vehicle_value: 10000,
//   overnight_parking: "",
//   transmission_type: 0,
//   expected_km_annual: "",
//   purpose_of_vehicle_use: "",
//   driving_city: "",
//   repair_method: "",
//   vehicle_specifications: "",
//   page_size: 2,
//   current_page: 0
// };

export function getQuotesReducer(state, action: GetQuotesActions.Actions) {
  switch (action.type) {
    case GetQuotesActions.Update_GetQuotes:
      return { ...state, ...action.payload };
    case GetQuotesActions.Add_GetQuotes:
      return state;
    default:
      return state;
  }
}
