import { Action } from "@ngrx/store";
import { Driver } from "../shared/models/driver.model";

export const Add_Driver = "Driver Add";
export const Remove_Driver = "Driver Remove";
export const RemoveAll_Drivers = " Remove ِAll Drivers";
export const Update_Driver = "Driver Update";

export class AddDriver implements Action {
  readonly type = Add_Driver;
  constructor(public payload: Driver) {}
}
export class RemoveDriver implements Action {
  readonly type = Remove_Driver;
  constructor(public payload: string) {}
}
export class UpdateDriver implements Action {
  readonly type = Update_Driver;
  constructor(public payload: { driver: Driver; oldID: string }) {}
}
export class removeAllDrivers implements Action {
  readonly type = RemoveAll_Drivers;
}

export type Actions =
  | AddDriver
  | RemoveDriver
  | UpdateDriver
  | removeAllDrivers;
