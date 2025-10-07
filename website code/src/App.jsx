import { useState, useEffect } from "react";
import "./App.css";
import { fetchCurrencies, fetchExchangeRates } from "./api";
import image from "./funimage.jpg";

export default function App() {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("usd");
  const [exchangeRates, setExchangeRates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurrencies()
      .then((response) => {
        const entries = Object.entries(response);
        setCurrencies(entries);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  useEffect(() => {
    if (!baseCurrency) return;

    setIsLoading(true);
    setError(null);
    fetchExchangeRates(baseCurrency)
      .then((response) => {
        const rates = Object.entries(response[baseCurrency]);
        setExchangeRates(rates);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [baseCurrency]);

  const BaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  return (
    <div className="App">
      <header>
        <h1>Exchange Rate Viewer</h1>
      </header>
      <main>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <label htmlFor="base-currency-select">
              <h2>
                Select Base Currency:{" "}
                <strong>{baseCurrency.toUpperCase()}</strong>
              </h2>
            </label>
            <div className="select-container">
              <select
                id="base-currency-select"
                value={baseCurrency}
                onChange={BaseCurrencyChange}
              >
                {currencies.map(([code, name]) => (
                  <option key={code} value={code}>
                    {code.toUpperCase()} - {name}
                  </option>
                ))}
              </select>
            </div>
            {exchangeRates && (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Currency</th>
                      <th>Rate (1 {baseCurrency.toUpperCase()} =)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exchangeRates.map(([code, rate]) => (
                      <tr key={code}>
                        <td>{code.toUpperCase()}</td>
                        <td>{rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
      <img src={image} className="image" />
    </div>
  );
}