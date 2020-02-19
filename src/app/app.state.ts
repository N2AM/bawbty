import { BasicInfo } from "./shared/models/basic-info.model";
import { VehicleInfoForm } from "./shared/models/vehicle-info-form.model";
import { UserInfoForm } from "./shared/models/user-info-form.model";
import { Driver } from "./shared/models/driver.model";
import { UserInfo } from "./shared/models/user-info.model";
import { GetQuotes } from "./shared/models/getQuotes.model";
import { UserInfoLookUps } from "./shared/models/userInfoLookUps.model";
import { VehicleLookups } from "./shared/models/vehicleLookups.model";
import { Quote } from "./shared/models/quote.model";
import { QuoteModel } from "./shared/models/quoteModel.model";
import { Policy } from "./shared/models/policy.model";

export interface AppState {
  readonly basicInfo: BasicInfo;
  readonly userInfo: UserInfo;
  readonly vehicleInfo: VehicleInfoForm;
  readonly driver: Driver[];
  readonly userInfoForm: UserInfoForm;
  readonly quotesRequest: GetQuotes;
  readonly userInfoLookups: UserInfoLookUps;
  readonly vehicleInfoLookups: VehicleLookups;
  readonly drivingPercentage: number[];
  readonly quotes: Quote;
  readonly policy: Policy;
  readonly comparedItems: QuoteModel[];
  readonly register: any;
  readonly vehicleImgs: any;
}
