import * as UserInfoLookUpsActions from "./../actions/userInfo-lookups.action";
import { UserInfoLookUps } from "../shared/models/userInfoLookUps.model";

const initialState: UserInfoLookUps = {
  Education_qualification: [
    {
      id: "",
      name: ""
    }
  ],
  license_type: [
    {
      id: "",
      name: ""
    }
  ],
  Medical_conditions: [
    {
      id: "",
      name: ""
    }
  ],
  Traffic_violations: [
    {
      id: "",
      name: ""
    }
  ]
};

export function userInfoLookupsReducer(
  state: UserInfoLookUps = initialState,
  action: UserInfoLookUpsActions.Actions
) {
  switch (action.type) {
    case UserInfoLookUpsActions.Update_UserInfoLookUps:
      return action.payload;
    default:
      return state;
  }
}
