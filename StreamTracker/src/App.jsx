import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getCurrencies } from './api/currencyService';
import CurrencyConverter from './components/CurrencyConverter';

function App() {
  const [currencies, setCurrencies] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const currencyData = await getCurrencies();
        setCurrencies(currencyData);
        console.log("Fetched currencies:", currencyData);
      } catch (error) {
        console.error("Failed to initialize currencies", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCurrencies();
  }, []);

  return (
    <>
      <div className="App">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Currency Converter</h1>
      {isLoading ? (
        <p>Loading currencies...</p>
      ) : (
        <CurrencyConverter currencies={currencies} />
      )}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
