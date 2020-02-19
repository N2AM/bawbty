import * as VehicleImgsActions from "./../actions/vehicleImgs.action";

export function vehicleImgsReducer(
  state: any = [],
  action: VehicleImgsActions.Actions
) {
  switch (action.type) {
    case VehicleImgsActions.Add_VehicleImg:
      state.filter(s => s.label !== action.payload.label);
      return [
        ...state.filter(s => s.label !== action.payload.label),
        action.payload
      ];
    case VehicleImgsActions.Remove_VehicleImgs:
      return [];
    case VehicleImgsActions.Remove_VehicleImg:
      return state.filter(s => s.label !== action.payload);
    case VehicleImgsActions.Update_VehicleImg:
      return [];
    default:
      return state;
  }
}
