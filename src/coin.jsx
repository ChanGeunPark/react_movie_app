import { useEffect, useState } from "react";

// 코인 api데이터 활용하기
function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers").then((response) =>
      response.json().then((json) => {
        setCoins(json);
        setLoading(false);
      })
    );
  }, []);

  const priceHandle = (event) => {
    setPrice(event.target.value);
    console.log(price);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setCoins(coins.filter((coinPrice) => coinPrice.quotes.USD.price < price));
  };

  return (
    <div>
      <h1>The Coins!{loading ? "" : `(${coins.length})`}</h1>
      <form action="" onSubmit={onSubmit}>
        <input
          type="number"
          value={price}
          onChange={priceHandle}
          placeholder="단위 USD$"
        />
        <button type="submit">가격 측정</button>
      </form>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coins) => (
            <option key={coins.id}>
              {coins.name} ({coins.symbol}): ${coins.quotes.USD.price}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
