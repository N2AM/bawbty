import { Driver } from "./driver.model";

export class UserInfoForm {
  date_of_birth: string;
  Education_qualification: string;
  children_below_16: number;
  license_type: string;
  Traffic_violations: [];
  Medical_conditions: [];
  drivers: Driver[];
}
