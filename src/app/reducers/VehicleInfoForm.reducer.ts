import * as VehicleInfoFormActions from "./../actions/vehicleInfo.action";
import { VehicleInfoForm } from "../shared/models/vehicle-info-form.model";

const initialState: VehicleInfoForm = {
  vehicle_value: 10000,
  overnight_parking: "",
  transmission_type: 0,
  expected_km_annual: "",
  purpose_of_vehicle_use: "",
  driving_city: "",
  vehicle_specifications: "",
  repair_method: ""
};

export function vehicleInfoReducer(
  state: VehicleInfoForm = initialState,
  action: VehicleInfoFormActions.Actions
) {
  switch (action.type) {
    case VehicleInfoFormActions.Update_VehicleInfoForm:
      return action.payload;
    default:
      return state;
  }
}
