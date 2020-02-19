import { Action } from "@ngrx/store";
import { UserInfoForm } from "../shared/models/user-info-form.model";

export const Update_UserInfoForm = "UserInfoForm  Update";
export const Remove_UserInfoForm = "UserInfoForm  Remove";

export class UpdateUserInfoForm implements Action {
  readonly type = Update_UserInfoForm;
  constructor(public payload: UserInfoForm) {}
}
export class RemoveUserInfoForm implements Action {
  readonly type = Remove_UserInfoForm;
  constructor(public payload: number) {}
}

export type Actions = UpdateUserInfoForm | RemoveUserInfoForm;
