import { Driver } from "./driver.model";

export class GetQuotesRequest {
  registration_type: number;
  purpose_of_insurance: number;
  owner_national_id: string;
  sequence_number: string;
  custom_number: string;
  insured_national_id: string;
  policy_effective_date: string;
  date_of_birth: string;
  Education_qualification: string;
  children_below_16: 0;
  license_type: string;
  Traffic_violations: [];
  Medical_conditions: [];
  drivers: Driver[];
  vehicle_value: string;
  overnight_parking: string;
  transmission_type: 0;
  expected_km_annual: string;
  purpose_of_vehicle_use: string;
  driving_city: string;
  vehicle_specifications: string;
  current_page: 1;
}
