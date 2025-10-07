const API_BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

export async function fetchCurrencies() {
  const response = await fetch(`${API_BASE_URL}/currencies.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch currency list.");
  }
  return response.json();
}

export async function fetchExchangeRates(baseCurrency) {
  if (!baseCurrency) {
    throw new Error("Base currency is required.");
  }
  const response = await fetch(`${API_BASE_URL}/currencies/${baseCurrency}.json`);
  if (!response.ok) {
    throw new Error("Network response failed");
  }
  return response.json();
}