import { QuoteModel } from "./quoteModel.model";

export class Quote {
  success: boolean;
  data: any;
  code: any;
  message: any[];
  x_correlation_id: string;
  motor_model: string;
  motor_maker: string;
  motor_logo: string;
  motor_plate_number: string;
  manufacturer_year: string;
  motor_cylinder: string;
  quotes: QuoteModel[];
  price_details: {
    basicPremium: string;
    noClaimDiscount: string;
    valueAddedTax: string;
  };
  quotes_ExpiryDate: string;
  DiscountEligibility: string;
  page_size: number;
  current_page: number;
  total_items: number;
}
