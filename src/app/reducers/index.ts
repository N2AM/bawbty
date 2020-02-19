import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { basicInfoReducer } from "./basicInfo.reducer";
import { userInfoFormReducer } from "./userInfoForm.reducer";
import { driverReducer } from "./driver.reducer";
import { vehicleInfoReducer } from "./VehicleInfoForm.reducer";
import { getQuotesReducer } from "./get-quotes.reducer";
import { userInfoLookupsReducer } from "./UserInfoLookUps.reducer";
import { userInfoReducer } from "./userInfo.reducer";
import { vehicleInfoLookupsReducer } from "./vehicleInfoLookups.reducer";
import { drivingPercentageReducer } from "./drivingPercentage.reducer";
import { quotesReducer } from "./quotes.reducer";
import { comparedItemsReducer } from "./compared-items.reducer";
import { policyReducer } from "./policy.reducer";
import { registerReducer } from "./register.reducer";
import { vehicleImgsReducer } from "./vehicleImgs.reducer";

export interface State {}

export const reducers: ActionReducerMap<State> = {
  basicInfo: basicInfoReducer,
  userInfoForm: userInfoFormReducer,
  userInfo: userInfoReducer,
  vehicleInfo: vehicleInfoReducer,
  driver: driverReducer,
  quotesRequest: getQuotesReducer,
  userInfoLookups: userInfoLookupsReducer,
  vehicleInfoLookups: vehicleInfoLookupsReducer,
  drivingPercentage: drivingPercentageReducer,
  quotes: quotesReducer,
  comparedItems: comparedItemsReducer,
  policy: policyReducer,
  register: registerReducer,
  vehicleImgs: vehicleImgsReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
