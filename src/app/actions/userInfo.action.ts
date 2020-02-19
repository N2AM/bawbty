import { Action } from "@ngrx/store";
import { UserInfo } from "../shared/models/user-info.model";

export const Update_UserInfo = "UserInfo Update";
export const Remove_UserInfo = "UserInfo Remove";

export class UpdateUserInfo implements Action {
  readonly type = Update_UserInfo;
  constructor(public payload: UserInfo) {}
}
export class RemoveUserInfo implements Action {
  readonly type = Remove_UserInfo;
  constructor(public payload: number) {}
}

export type Actions = UpdateUserInfo | RemoveUserInfo;
