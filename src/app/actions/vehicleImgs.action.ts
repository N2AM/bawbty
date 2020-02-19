import { Action } from "@ngrx/store";

export const Add_VehicleImg = "VehicleImgs Add";
export const Remove_VehicleImgs = "VehicleImgs Remove";
export const Remove_VehicleImg = "VehicleImg Remove";
export const Update_VehicleImg = "VehicleImg Update";

export class AddVehicleImgs implements Action {
  readonly type = Add_VehicleImg;
  constructor(public payload: any) {}
}
export class UpdateVehicleImg implements Action {
  readonly type = Update_VehicleImg;
  constructor(public payload: any) {}
}
export class RemoveVehicleImgs implements Action {
  readonly type = Remove_VehicleImgs;
  constructor() {}
}
export class RemoveVehicleImg implements Action {
  readonly type = Remove_VehicleImg;
  constructor(public payload: any) {}
}

export type Actions =
  | AddVehicleImgs
  | UpdateVehicleImg
  | RemoveVehicleImgs
  | RemoveVehicleImg;
