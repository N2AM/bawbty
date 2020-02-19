import { Action } from "@ngrx/store";

export const Add_DrivingPercentage = "DrivingPercentage Add";
export const Remove_DrivingPercentage = "DrivingPercentage Remove";
export const Update_DrivingPercentage = "DrivingPercentage Update";
export const Reset_DrivingPercentage = "DrivingPercentage Reset";

export class AddDrivingPercentage implements Action {
  readonly type = Add_DrivingPercentage;
  constructor(public payload: number) {}
}
export class RemoveDrivingPercentage implements Action {
  readonly type = Remove_DrivingPercentage;
  constructor(public payload: number) {}
}
export class UpdateDrivingPercentage implements Action {
  readonly type = Update_DrivingPercentage;
  constructor(public payload: number) {}
}
export class ResetDrivingPercentage implements Action {
  readonly type = Reset_DrivingPercentage;
}
export type Actions =
  | AddDrivingPercentage
  | RemoveDrivingPercentage
  | UpdateDrivingPercentage
  | ResetDrivingPercentage;
