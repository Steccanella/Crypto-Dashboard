import NewsFeed from "./components/NewsFeed.js";
import CurrencyConverter from "./components/CurrencyConverter.js";
function App() {
  return (
    <div className="app">
      <CurrencyConverter />
      <NewsFeed />
    </div>
  );
}

export default App;
