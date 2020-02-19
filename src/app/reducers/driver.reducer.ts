import * as DriverActions from "../actions/driver.action";
import { Driver } from "../shared/models/driver.model";

// const initialState: Driver = {
//   driver_national_id: "",
//   date_of_birth: "",
//   Education_qualification: "",
//   children_below_16: 0,
//   Traffic_violations: [""],
//   Medical_conditions: [""],
//   driving_percentage: 0
// };

export function driverReducer(
  state: Driver[] = [],
  action: DriverActions.Actions
) {
  switch (action.type) {
    case DriverActions.Add_Driver:
      // console.log(state);
      return [...state, action.payload];
    case DriverActions.Remove_Driver:
      return state.filter(state => state.driver_national_id !== action.payload);
    case DriverActions.Update_Driver:
      // console.log(state);
      let driver = state.findIndex(
        state => state.driver_national_id === action.payload.oldID
      );
      // console.log(driver);
      state[driver] = action.payload.driver;
      // console.log(action.payload, state);
      return state;
    case DriverActions.RemoveAll_Drivers:
      return [];
    default:
      return state;
  }
}
