import * as UserInfoFormActions from "./../actions/userInfoForm.action";
import { UserInfoForm } from "../shared/models/user-info-form.model";

const initialState: UserInfoForm = {
  date_of_birth: "",
  Education_qualification: "",
  children_below_16: 0,
  license_type: "",
  Traffic_violations: [],
  Medical_conditions: [],
  drivers: []
};

export function userInfoFormReducer(
  state,
  action: UserInfoFormActions.Actions
) {
  switch (action.type) {
    case UserInfoFormActions.Update_UserInfoForm:
      return action.payload;
    default:
      return state;
  }
}
