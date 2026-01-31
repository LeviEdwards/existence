// Historical gold prices (annual closing price in USD per troy ounce)
// Source: https://onlygold.com/gold-prices/historical-gold-prices/

export const goldPrices: Record<number, number> = {
  // 1913-1932: Gold Standard era (~$20.67)
  1913: 20.67,
  1914: 20.67,
  1915: 20.67,
  1916: 20.67,
  1917: 20.67,
  1918: 20.67,
  1919: 20.67,
  1920: 20.67,
  1921: 20.67,
  1922: 20.67,
  1923: 20.67,
  1924: 20.67,
  1925: 20.67,
  1926: 20.67,
  1927: 20.67,
  1928: 20.67,
  1929: 20.67,
  1930: 20.67,
  1931: 20.67,
  1932: 20.67,
  
  // 1933-1971: Post Gold Reserve Act ($35 era)
  1933: 32.32,
  1934: 35.00,
  1935: 35.00,
  1936: 35.00,
  1937: 35.00,
  1938: 35.00,
  1939: 35.00,
  1940: 34.50,
  1941: 35.50,
  1942: 35.50,
  1943: 36.50,
  1944: 36.25,
  1945: 37.25,
  1946: 38.25,
  1947: 43.00,
  1948: 42.00,
  1949: 40.50,
  1950: 40.25,
  1951: 40.00,
  1952: 38.70,
  1953: 35.50,
  1954: 35.25,
  1955: 35.15,
  1956: 35.20,
  1957: 35.25,
  1958: 35.25,
  1959: 35.25,
  1960: 36.50,
  1961: 35.50,
  1962: 35.35,
  1963: 35.25,
  1964: 35.35,
  1965: 35.50,
  1966: 35.40,
  1967: 35.50,
  1968: 43.50,
  1969: 41.00,
  1970: 38.90,
  1971: 44.60,
  
  // 1972-present: Free market era
  1972: 63.84,
  1973: 106.48,
  1974: 183.77,
  1975: 139.29,
  1976: 133.77,
  1977: 161.10,
  1978: 208.10,
  1979: 459.00,
  1980: 594.90,
  1981: 400.00,
  1982: 447.00,
  1983: 380.00,
  1984: 308.00,
  1985: 327.00,
  1986: 390.90,
  1987: 486.50,
  1988: 410.15,
  1989: 401.00,
  1990: 386.20,
  1991: 353.15,
  1992: 333.00,
  1993: 391.75,
  1994: 383.25,
  1995: 387.00,
  1996: 369.00,
  1997: 287.05,
  1998: 288.70,
  1999: 290.25,
  2000: 272.65,
  2001: 276.50,
  2002: 342.75,
  2003: 417.25,
  2004: 435.60,
  2005: 513.00,
  2006: 635.70,
  2007: 836.50,
  2008: 869.75,
  2009: 1087.50,
  2010: 1420.25,
  2011: 1531.00,
  2012: 1664.00,
  2013: 1204.50,
  2014: 1199.25,
  2015: 1060.00,
  2016: 1145.90,
  2017: 1296.50,
  2018: 1281.65,
  2019: 1517.27,
  2020: 1887.60,
  2021: 1820.10,
  2022: 1813.00,
  2023: 2062.40,
  2024: 2623.80,
  2025: 2770.00, // Approximate current price
  2026: 2800.00, // Projected/current
};

/**
 * Get gold price for a specific year
 * Uses the closest available year if exact match not found
 */
export function getGoldPrice(year: number): number {
  if (goldPrices[year]) return goldPrices[year];
  
  // Find closest year
  const years = Object.keys(goldPrices).map(Number).sort((a, b) => a - b);
  const closest = years.reduce((prev, curr) => 
    Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
  );
  
  return goldPrices[closest];
}

/**
 * Get current gold price (latest available)
 */
export function getCurrentGoldPrice(): number {
  const years = Object.keys(goldPrices).map(Number);
  return goldPrices[Math.max(...years)];
}

/**
 * Calculate gold investment growth
 * @param investmentAmount Initial investment in USD
 * @param birthYear Year of investment
 * @returns Current value of that investment
 */
export function calculateGoldGrowth(investmentAmount: number, birthYear: number): number {
  const birthPrice = getGoldPrice(birthYear);
  const currentPrice = getCurrentGoldPrice();
  return (investmentAmount / birthPrice) * currentPrice;
}
