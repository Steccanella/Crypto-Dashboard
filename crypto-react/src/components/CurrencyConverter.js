import ExchangeRate from "./ExchangeRate";
import {useState} from 'react'
import axios from "axios";

function CurrencyConverter() {

    const currencies = [ 'XRP', 'XMR', 'XLM', 'VET', 'USDT','SOL','SHIB','NEO', 'NANO', 'MANA', 'LUNA', 'LTC', 'LINK','IOTA', 'ETH', 'DOGE','BTC', 'AVAX', 'ATOM', 'ALGO','ADA' ]
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('ADA')
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('ADA')
    const [amount, setAmount] = useState(1)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [result, setResult] = useState(0)
    const [primaryCurrencyExchange, setPrimaryCurrencyExchange] = useState('ADA')
    const [secondaryCurrencyExchange, setSecondaryCurrencyExchange] = useState('ADA')
    console.log(amount)

    const convert = () => {

        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
            headers: {
              'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
              'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
              setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
              setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']*amount)
              setPrimaryCurrencyExchange(primaryCurrencyExchange)
              setSecondaryCurrencyExchange(secondaryCurrencyExchange)
            }).catch(function (error) {
              console.error(error);
          });
    }
 console.log(exchangeRate)
    return (
    <div className="currency-converter">
      <h2>Cryptocurrency Converter</h2>
      <div className="input-box">
        <table>
          <tbody>
            <tr>
              <td>Primary Currency</td>
              <td>
                <input
                onChange={(e) => setAmount(e.target.value)}
                 type="number" 
                 name="currency-amount-1" 
                 value={amount} />
              </td>
              <td>
                <select
                  name="currency-option-1"
                  className="currency-options"
                  onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                  value={chosenPrimaryCurrency}
                >
                  {currencies.sort().map( (currency, _index) => (<option key={_index}>{currency}</option>))}
                </select>
              </td>
            </tr>

            <tr>
              <td>Secondary Currency</td>
              <td>
                <input 
                id="sec-currency"
                name="currency-amount-2" 
                value={result} 
                disabled = {true}/>
              </td>
              <td>
                <select
                  name="currency-option-2"
                  className="currency-options"
                  onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                  value={chosenSecondaryCurrency}
                >
                  {currencies.sort().map( (currency, _index) => (<option key={_index}>{currency}</option>))}
                </select>
              </td> 
            </tr>

          </tbody>
        </table>

        <button id="convert-button" onClick={convert}>Convert</button>
      </div>
      <ExchangeRate 
      exchangeRate = {exchangeRate}
      chosenPrimaryCurrency = {chosenPrimaryCurrency}
      chosenSecondaryCurrency = {chosenSecondaryCurrency}
      />
    </div>
  );
}

export default CurrencyConverter;
