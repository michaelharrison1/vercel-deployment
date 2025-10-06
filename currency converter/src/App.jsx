import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const url =
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
    fetch(url)
      .then((r) => r.json())
      .then((response) => {
        const entries = Object.entries(response);
        setCurrencies(entries); 
      });
  }, []);

  return (
    <div className="App">
      <h1>Currencies</h1>
      <table>
        <tbody>
          <tr>
            <th>Code</th>
            <th>Name</th>
          </tr>
          {currencies.map(([code, name]) => (
            <tr key={code}>
              <td>{code.toUpperCase()}</td>
              <td>{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
