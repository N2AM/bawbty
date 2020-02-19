import { Action } from "@ngrx/store";
import { BasicInfo } from "../shared/models/basic-info.model";

export const Update_BasicInfo = "BasicInfo Update";
export const Remove_BasicInfo = "BasicInfo Remove";

export class UpdateBasicInfo implements Action {
  readonly type = Update_BasicInfo;
  constructor(public payload: BasicInfo) {}
}
export class RemoveBasicInfo implements Action {
  readonly type = Remove_BasicInfo;
  constructor(public payload: number) {}
}

export type Actions = UpdateBasicInfo | RemoveBasicInfo;
