import * as UserInfoActions from "../actions/userInfo.action";
import { UserInfo } from "../shared/models/user-info.model";

// const initialState: UserInfo = {
//   education: "",
//   licenseType: "",
//   dateOfBirth: ""
// };

export function userInfoReducer(state, action: UserInfoActions.Actions) {
  switch (action.type) {
    case UserInfoActions.Update_UserInfo:
      return action.payload;
    default:
      return state;
  }
}
