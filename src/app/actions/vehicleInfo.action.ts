import { Action } from "@ngrx/store";
import { VehicleInfoForm } from "../shared/models/vehicle-info-form.model";

export const Update_VehicleInfoForm = "VehicleInfoForm Update";
export const Remove_VehicleInfoForm = "VehicleInfoForm Remove";

export class UpdateVehicleInfoForm implements Action {
  readonly type = Update_VehicleInfoForm;
  constructor(public payload: VehicleInfoForm) {}
}
export class RemoveVehicleInfoForm implements Action {
  readonly type = Remove_VehicleInfoForm;
  constructor(public payload: number) {}
}

export type Actions = UpdateVehicleInfoForm | RemoveVehicleInfoForm;
