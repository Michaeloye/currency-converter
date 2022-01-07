import "./App.css";
import Header from "./components/header";
import CurrencyCard from "./components/currencyCard";
import { CgArrowsExchange } from "react-icons/cg";

function App() {
  return (
    <div className="h-screen">
      <Header />
      <p>From</p>
      <CurrencyCard />
      <div className="bg-primary-red mx-auto mt-5 mb-5 h-12 w-12 flex justify-center items-center rounded-full">
        <CgArrowsExchange color="white" size="33" />
      </div>
      <p>To</p>
      <CurrencyCard />
    </div>
  );
}

export default App;
