// Fixed planning assumption, not a live exchange rate.
export const USD_TO_INR = 95;
const number = (value: number) => value.toLocaleString('en-IN', { maximumFractionDigits: 2 });

/** Convert source amounts in USD millions to INR crore exactly once. */
export const usdMillionsToCrore = (value: number) => value * USD_TO_INR / 10;

/** Format native INR crore; cards use lakhs below one crore. */
export function formatInrCrore(value: number): string {
  const magnitude = Math.abs(value);
  const sign = value < 0 ? '−' : '';
  if (magnitude === 0) return '₹0';
  return magnitude < 1
    ? `${sign}₹${number(magnitude * 100)} L`
    : `${sign}₹${number(magnitude)} Cr`;
}

export const formatUsdMillionsInInr = (value: number) => formatInrCrore(usdMillionsToCrore(value));
/** Charts retain a single unit across the entire series. */
export const formatCroreAxis = (value: number) => `₹${number(value)}`;
export const formatCroreChart = (value: number) => `${formatCroreAxis(value)} Cr`;
