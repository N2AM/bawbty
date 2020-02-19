import * as BasicInfoActions from "./../actions/basicInfo.action";
import { BasicInfo } from "../shared/models/basic-info.model";
import * as moment from "moment";

// const initialState: BasicInfo = {
//   registration_type: 0,
//   purpose_of_insurance: 0,
//   // sequence_number: "",
//   // custom_number: "",
//   insured_national_id: "",
//   policy_effective_date: "",
//   birthMonth: "01",
//   birthYear: "1430",
//   manifucture_year: "",
//   VehicleID: 0
// };

export function basicInfoReducer(state, action: BasicInfoActions.Actions) {
  switch (action.type) {
    case BasicInfoActions.Update_BasicInfo:
      return action.payload;
    default:
      return state;
  }
}
