import { Driver } from "./driver.model";

export class GetQuotes {
  registration_type?: number;
  purpose_of_insurance?: number;
  owner_national_id?: string;
  // sequence_number?: string;
  // custom_number?: string;
  VehicleID: number;
  insured_national_id?: string;
  policy_effective_date?: string;
  date_of_birth?: string;
  manifucture_year: number;
  Education_qualification?: string;
  children_below_16?: number;
  license_type?: string;
  Traffic_violations?: [];
  Medical_conditions?: [];
  drivers?: Driver[];
  vehicle_value?: number;
  overnight_parking?: string;
  transmission_type?: number;
  expected_km_annual?: string;
  purpose_of_vehicle_use?: string;
  driving_city?: string;
  repair_method: string;
  vehicle_specifications?: string;
  current_page?: number;
  page_size?: number;
}
