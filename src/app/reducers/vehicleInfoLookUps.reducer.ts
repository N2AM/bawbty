import * as vehicleInfoLookupsActions from "../actions/vehicleInfo-lookups.action";
import { VehicleLookups } from "../shared/models/vehicleLookups.model";

const initialState: VehicleLookups = {
  Overnight_parkings: [
    {
      Id: "",
      Name: "",
      IsDefault: false
    }
  ],
  Expected_km_anually: [
    {
      Id: "",
      Name: "",
      IsDefault: false
    }
  ],
  Purpose_of_vehicle_use: [
    {
      Id: "",
      Name: "",
      IsDefault: false
    }
  ],
  Driving_city: [
    {
      Id: "",
      Name: ""
      // IsDefault: false
    }
  ],
  RepairMethods: [
    {
      Id: "",
      Name: "",
      IsDefault: false
    }
  ],
  VehicleSpecifications: [
    {
      Id: "",
      Name: "",
      IsDefault: false
    }
  ]
};

export function vehicleInfoLookupsReducer(
  state: VehicleLookups = initialState,
  action: vehicleInfoLookupsActions.Actions
) {
  switch (action.type) {
    case vehicleInfoLookupsActions.Update_vehicleInfoLookups:
      return action.payload;
    default:
      return state;
  }
}
