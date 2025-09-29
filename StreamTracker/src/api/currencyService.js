const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1';

export async function getCurrencies() {
  try {
    const response = await fetch(`${BASE_URL}/currencies.json`);
    if (!response.ok) {
      throw new Error('Network failed');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed due to:", error);
    return {};
  }
}

export async function getConversionRate(fromCurrency, toCurrency) {
  try {
    const response = await fetch(`${BASE_URL}/currencies/${fromCurrency}.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok for conversion rate');
    }
    const data = await response.json();
    const rate = data[fromCurrency][toCurrency];
    if (rate === undefined) {
      throw new Error(`Rate for ${toCurrency} not found.`);
    }
    return rate;
  } catch (error) {
    console.error("Failed to fetch conversion rate:", error);
    throw error;
  }
}