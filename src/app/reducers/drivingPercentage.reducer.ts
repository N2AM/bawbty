import * as DrivingPercentageActions from "../actions/drivingPercentage.action";
import * as _ from "lodash";

const initialState = [25, 50, 75, 100];
export function drivingPercentageReducer(
  state: number[] = initialState,
  action: DrivingPercentageActions.Actions
) {
  switch (action.type) {
    case DrivingPercentageActions.Add_DrivingPercentage:
      // console.log(state);
      return [...state, action.payload];

    case DrivingPercentageActions.Remove_DrivingPercentage:
      // console.log(state, action.payload);
      if (state.length > 0) {
        let maxVlaue = action.payload + _.max(state);
        // console.log(maxVlaue, _.max(state));
        // console.log(initialState.filter(s => s <= maxVlaue));
        // console.log(initialState);
        return initialState.filter(s => s <= maxVlaue);
      } else {
        return initialState.filter(s => s <= action.payload);
      }

    case DrivingPercentageActions.Update_DrivingPercentage:
      // console.log(state);
      let maxUpVlaue = _.max(state);
      maxUpVlaue = maxUpVlaue - action.payload;
      // console.log(maxUpVlaue);
      if (maxUpVlaue > 0) {
        return state.filter(m => m <= maxUpVlaue);
      } else if (maxUpVlaue === 0) {
        return [];
      }
      // console.log(state);
      return state;
    case DrivingPercentageActions.Reset_DrivingPercentage:
      return initialState;
    default:
      return state;
  }
}
