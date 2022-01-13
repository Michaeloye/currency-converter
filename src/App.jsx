import React, { useState, useEffect } from "react";
import Header from "./components/header";
import CurrencyCard from "./components/currencyCard";
import { CgArrowsExchange } from "react-icons/cg";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [amountInput, setAmountInput] = useState(1000);
  const [amountOutput, setAmountOutput] = useState("");

  const [flagURL, setFlagURL] = useState("https://countryflagsapi.com/svg/US");
  const [secondFlagURL, setSecondFlagURL] = useState(
    "https://countryflagsapi.com/svg/US"
  );

  const [inputValue, setInputValue] = useState("USD - US Dollar");
  const [secondInputValue, setSecondInputValue] = useState("USD - US Dollar");

  const [identifier, setIdentifier] = useState("US");
  const [secondIdentifier, setSecondIdentifier] = useState("US");

  const [currencyCode, setCurrencyCode] = useState([{ symbol: "$" }]);
  const [secondCurrencyCode, setSecondCurrencyCode] = useState([
    { symbol: "$" },
  ]);

  const [imageAvailable, setImageAvailable] = useState(true);
  const [secondImageAvailable, setsecondImageAvailable] = useState(true);

  // Function for first component
  function setCountry(e) {
    const country = e.target.value;
    const url = "https://countryflagsapi.com/svg/";
    const filterCountryCode = countries.filter(
      (cout) => cout.code === country.slice(0, 3)
    );
    setCurrencyCode(filterCountryCode);

    setIdentifier(country.slice(0, 2));

    setInputValue(country);
    // check if flag image exists

    const img = new Image();
    img.src = url + identifier;

    if (img.complete) {
      setImageAvailable(true);
    } else {
      img.onload = () => {
        setImageAvailable(true);
      };

      img.onerror = () => {
        setImageAvailable(false);
      };
    }
  }

  // Function for second component
  function setSecondCountry(e) {
    const country = e.target.value;
    const url = "https://countryflagsapi.com/svg/";
    const filterCountryCode = countries.filter(
      (cout) => cout.code === country.slice(0, 3)
    );
    setSecondCurrencyCode(filterCountryCode);

    setSecondIdentifier(country.slice(0, 2));

    setSecondInputValue(country);
    // check if flag image exists

    const img = new Image();
    img.src = url + secondIdentifier;

    if (img.complete) {
      setsecondImageAvailable(true);
    } else {
      img.onload = () => {
        setsecondImageAvailable(true);
      };

      img.onerror = () => {
        setsecondImageAvailable(false);
      };
    }
  }

  // Function to clear first input
  function clearInput() {
    setInputValue("");
  }

  // Function to clear second input
  function secondClearInput() {
    setSecondInputValue("");
  }

  function changeAmountInput(e) {
    setAmountInput(e.target.value);
  }
  function changeAmountOutput(e) {
    setAmountOutput(e.target.value);
  }
  function switchInputOutput() {
    const tmp = { inputValue, identifier, currencyCode };
    setInputValue(secondInputValue);
    setSecondInputValue(tmp.inputValue);

    setIdentifier(`${secondIdentifier}`);
    setSecondIdentifier(`${tmp.identifier}`);

    setCurrencyCode(secondCurrencyCode);
    setSecondCurrencyCode(tmp.currencyCode);
  }
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/Michaeloye/currencies-name-and-code/main/currency-list.json"
      )
      .then((res) => {
        setCountries(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const url = "https://countryflagsapi.com/svg/";
    setFlagURL(url + identifier);
    setSecondFlagURL(url + secondIdentifier);

    axios
      .get(
        `https://v6.exchangerate-api.com/v6/${
          import.meta.env.VITE_APP_API_KEY
        }/pair/${inputValue.slice(0, 3)}/${secondInputValue.slice(0, 3)}`
      )
      .then((res) => {
        setAmountOutput(amountInput * res.data.conversion_rate);
      })
      .catch((error) => console.log(error));
  }, [inputValue, secondInputValue, identifier, secondIdentifier, amountInput]);

  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col items-center md:gap-7 md:mt-7 md:flex-row md:justify-center">
        <div>
          <p className="text-primary-gray font-medium mt-3 md:mt-auto ml-5 mb-1 ">
            From
          </p>
          <CurrencyCard
            countryFlag={flagURL}
            data={countries}
            currencyCode={currencyCode}
            inputValue={inputValue}
            imageAvailable={imageAvailable}
            setCountry={setCountry}
            clearInput={clearInput}
            amount={amountInput}
            setAmount={changeAmountInput}
          />
        </div>
        <div
          className="bg-primary-red h-12 w-12 mt-5 md:mt-0 flex justify-center items-center rounded-full 
          cursor-pointer shadow-light hover:bg-red-400"
          onClick={() => switchInputOutput()}
        >
          <CgArrowsExchange color="white" size="33" />
        </div>
        <div>
          <p className="text-primary-gray font-medium ml-5 mb-1 ">To</p>
          <CurrencyCard
            countryFlag={secondFlagURL}
            data={countries}
            currencyCode={secondCurrencyCode}
            inputValue={secondInputValue}
            imageAvailable={secondImageAvailable}
            setCountry={setSecondCountry}
            clearInput={secondClearInput}
            amount={amountOutput}
            setAmount={changeAmountOutput}
          />
        </div>
      </div>

      <footer
        className="text-center text-sm mt-10 md:absolute md:-ml-20"
        style={{ bottom: "3%", left: "50%" }}
      >
        made by{" "}
        <a href="https://github.com/Michaeloye" className="text-blue-900">
          Oyebadejo Michael
        </a>
      </footer>
    </div>
  );
}

export default App;
