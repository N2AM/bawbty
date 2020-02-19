export class QuoteModel {
  QuoteNumber: string;
  company_logo: string;
  company_name: string;
  company_rate: number;
  insurance_type: string;
  insurance_code: string;
  insurerCode: string;
  price: number;
  total_price: any;
  deductiblesDetails: {
    DeductibleAmount: number;
    PremiumBreakdownList: {
      BreakdownTypeID: number;
      BreakdownAmount: number;
      BreakdownPercentage: number;
    }[];
    DiscountList: {
      DiscountTypeID: number;
      DiscountPercentage: number;
      DiscountAmount: number;
    }[];
  }[];
  on_compare?: boolean;
  included_benefits: [string];
  additionalBenefits_and_PriceDetails: {
    additional_benefits: {
      description: string;
      price: number;
      id: number;
      checked?: boolean;
      Type?: number;
    }[];
    price_details: {
      BasicPremium: number;
      NoClaimDiscount: number;
      ValueAddedTax: number;
      additionalLoading: number;
      loyaltyDiscount: number;
      specialDiscount: number;
      additionalAgeContribution: number;
      adminFees: number;
      falCommission: number;
    };
  };
  quoteBenefits: {
    description: string;
    price: number;
    id: number;
    checked?: boolean;
    Type?: number;
  }[];
  option: any;
  selectedDeductible: number;
}
