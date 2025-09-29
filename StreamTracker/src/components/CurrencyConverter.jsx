import { useState, useEffect } from 'react';
import { getConversionRate } from '../api/currencyService';

function CurrencyConverter({ currencies }) {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('usd');
  const [toCurrency, setToCurrency] = useState('eur');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    // Don't run if the amount is invalid
    if (!amount || amount <= 0) {
      setConvertedAmount(null);
      return;
    }

    async function convert() {
      setIsConverting(true);
      try {
        const rate = await getConversionRate(fromCurrency, toCurrency);
        setConvertedAmount((amount * rate).toFixed(2));
      } catch (error) {
        // Handle errors, e.g., show a message to the user
        setConvertedAmount('Error');
      } finally {
        setIsConverting(false);
      }
    }

    convert();
  }, [amount, fromCurrency, toCurrency]);

  const currencyOptions = Object.keys(currencies).map(currencyCode => (
    <option key={currencyCode} value={currencyCode}>
      {currencyCode.toUpperCase()} - {currencies[currencyCode]}
    </option>
  ));

  return (
    <div className="card">
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        min="0"
      />
      <select
        value={fromCurrency}
        onChange={e => setFromCurrency(e.target.value)}
      >
        {currencyOptions}
      </select>
      <select
        value={toCurrency}
        onChange={e => setToCurrency(e.target.value)}
      >
        {currencyOptions}
      </select>

      <h2>Result</h2>
      {isConverting ? (
        <p>Converting...</p>
      ) : (
        convertedAmount && <p>{amount} {fromCurrency.toUpperCase()} = {convertedAmount} {toCurrency.toUpperCase()}</p>
      )}
    </div>
  );
}

export default CurrencyConverter;
