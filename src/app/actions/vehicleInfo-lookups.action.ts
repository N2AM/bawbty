import { Action } from "@ngrx/store";
import { VehicleLookups } from "../shared/models/vehicleLookups.model";

export const Update_vehicleInfoLookups = "vehicleInfoLookups Update";
export const Remove_vehicleInfoLookups = "vehicleInfoLookups Remove";

export class UpdatevehicleInfoLookups implements Action {
  readonly type = Update_vehicleInfoLookups;
  constructor(public payload: VehicleLookups) {}
}
export class RemovevehicleInfoLookups implements Action {
  readonly type = Remove_vehicleInfoLookups;
  constructor(public payload: number) {}
}

export type Actions = UpdatevehicleInfoLookups | RemovevehicleInfoLookups;
