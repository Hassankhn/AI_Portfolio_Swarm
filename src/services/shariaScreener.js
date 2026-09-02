// AAOIFI Standard No. 21 Compliance Screening Logic

export function evaluateAAOIFICompliance(asset) {
  const HARAM_SECTORS = [
    "Conventional Banking",
    "Alcohol & Beverages",
    "Casinos & Gambling",
    "Pork & Non-Halal Meat",
    "Adult Entertainment",
    "Weapons & Armaments",
    "Conventional Insurance"
  ];

  // 1. Business Sector Check
  const sectorCompliant = !HARAM_SECTORS.includes(asset.sector);

  // 2. Financial Ratio 1: Interest-bearing Debt / Market Capitalization < 33%
  const debtRatioCompliant = asset.debtRatio < 33.0;

  // 3. Financial Ratio 2: Interest-bearing Cash & Investments / Market Capitalization < 33%
  const cashInterestRatioCompliant = asset.cashInterestRatio < 33.0;

  // 4. Financial Ratio 3: Impermissible (Non-Halal) Revenue / Total Revenue < 5%
  const revenueCompliant = asset.impermissibleRevenue < 5.0;

  const isOverallCompliant = sectorCompliant && debtRatioCompliant && cashInterestRatioCompliant && revenueCompliant;

  return {
    isCompliant: isOverallCompliant,
    checks: {
      sectorCheck: { pass: sectorCompliant, value: asset.sector },
      debtRatioCheck: { pass: debtRatioCompliant, value: `${asset.debtRatio}%`, limit: "< 33%" },
      cashInterestCheck: { pass: cashInterestRatioCompliant, value: `${asset.cashInterestRatio}%`, limit: "< 33%" },
      impermissibleRevCheck: { pass: revenueCompliant, value: `${asset.impermissibleRevenue}%`, limit: "< 5%" }
    },
    purificationNeeded: asset.impermissibleRevenue > 0 && asset.impermissibleRevenue < 5.0,
    purificationPerShare: asset.purificationPerShare || 0.00
  };
}
