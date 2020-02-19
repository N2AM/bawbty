import { Action } from "@ngrx/store";
import { UserInfoLookUps } from "../shared/models/userInfoLookUps.model";

export const Update_UserInfoLookUps = "UserInfoLookUps Update";
export const Remove_UserInfoLookUps = "UserInfoLookUps Remove";

export class UpdateUserInfoLookUps implements Action {
  readonly type = Update_UserInfoLookUps;
  constructor(public payload: UserInfoLookUps) {}
}
export class RemoveUserInfoLookUps implements Action {
  readonly type = Remove_UserInfoLookUps;
  constructor(public payload: number) {}
}

export type Actions = UpdateUserInfoLookUps | RemoveUserInfoLookUps;
