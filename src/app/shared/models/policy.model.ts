export class Policy {
  PolicyHolderDetails: {
    NationalID: string;
    Name: string;
    NationalAddress: string;
  };
  PolicyDetails: {
    QuoteReference: string;
    QuoteExpiryDate: string;
    IssueDate: string;
    EffictiveDate: string;
    PolicyExpiryDate: string;
    CompanyLogo: string;
    CompanyName: string;
    InsuranceType: string;
    TotalPrice: string;
    PriceDetails: {
      BasicPremium: string;
      NoClaimDiscount: string;
      ValueAddedTax: string;
      AdditionalLoading: string;
      LoyaltyDiscount: string;
      SpecialDiscount: string;
      AdditionalAgeContribution: string;
      AdminFees: string;
      FaLcommetion: string;
    };
    includedBenefits: [any];
    additionalBenefits: [any];
    PolicyDrivers: [
      {
        DriverIDNumber: string;
        DriverBirthDate: string;
        DrivingPercentage: 0;
        Name: string;
      }
    ];
  };

  VehicleDetails: {
    Model: string;
    Maker: string;
    PlateNumber: string;
    Color: string;
    VehicleID: number;
  };
}
