// Historical Bitcoin prices (annual closing price in USD)
// Sources: Investopedia, CoinMarketCap, CoinDesk

export const bitcoinPrices: Record<number, number> = {
  // Early years - very low values
  2009: 0.001,     // Effectively $0, using tiny value to avoid division issues
  2010: 0.30,      // End of year, reached ~$0.30
  2011: 4.00,      // Closed year at ~$4 after hitting $30 peak in June
  2012: 13.00,     // Started 2013 at $13
  2013: 760.00,    // Crossed $1,000 in December, closed ~$760
  2014: 320.00,    // Bear market following Mt. Gox collapse
  2015: 430.00,    // Gradual recovery
  2016: 960.00,    // End of year, approaching $1,000
  2017: 14000.00,  // Hit $19,118 peak Dec 18, volatile end
  2018: 3700.00,   // Crypto winter, major decline
  2019: 7294.00,   // End of December close
  2020: 27081.00,  // Dec 28 close, +248% for year
  2021: 46709.00,  // Mid-Dec close, hit $67,549 peak Nov 8
  2022: 16688.00,  // Crypto winter, ended under $20K
  2023: 43599.00,  // Strong recovery year
  2024: 101237.00, // Broke $100K on Dec 8, 2024
  2025: 92119.00,  // Dec 1 close, hit $126,198 peak in Oct
  2026: 85000.00,  // Current ~$82,000-88,000 as of Jan 2026
};

/**
 * Get Bitcoin price for a specific year
 * Returns null if year is before Bitcoin existed (pre-2009)
 */
export function getBitcoinPrice(year: number): number | null {
  if (year < 2009) return null;
  if (bitcoinPrices[year]) return bitcoinPrices[year];
  
  // Find closest year within Bitcoin's existence
  const years = Object.keys(bitcoinPrices).map(Number).sort((a, b) => a - b);
  const closest = years.reduce((prev, curr) => 
    Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
  );
  
  return bitcoinPrices[closest];
}

/**
 * Get current Bitcoin price (latest available)
 */
export function getCurrentBitcoinPrice(): number {
  const years = Object.keys(bitcoinPrices).map(Number);
  return bitcoinPrices[Math.max(...years)];
}

/**
 * Calculate Bitcoin investment growth
 * @param investmentAmount Initial investment in USD
 * @param birthYear Year of investment
 * @returns Current value of that investment, or null if pre-Bitcoin
 */
export function calculateBitcoinGrowth(investmentAmount: number, birthYear: number): number | null {
  const birthPrice = getBitcoinPrice(birthYear);
  if (birthPrice === null) return null;
  
  const currentPrice = getCurrentBitcoinPrice();
  return (investmentAmount / birthPrice) * currentPrice;
}

/**
 * Check if Bitcoin existed in a given year
 */
export function bitcoinExisted(year: number): boolean {
  return year >= 2009;
}
