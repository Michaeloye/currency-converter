import React, { useState, useEffect } from "react";
import axios from "axios";

function CurrencyCard() {
  const [countries, setCountries] = useState([]);
  const [flagURL, setFlagURL] = useState("https://countryflagsapi.com/svg/US");
  const [inputValue, setInputValue] = useState("USD - US Dollar");
  const [identifier, setIdentifier] = useState("");
  const [currencyCode, setCurrencyCode] = useState([{ symbol: "$" }]);
  const [imageAvailable, setImageAvailable] = useState(true);

  function setCountry(country) {
    const url = "https://countryflagsapi.com/svg/";
    const filterCountryCode = countries.filter(
      (cout) => cout.code === country.slice(0, 3)
    );
    setCurrencyCode(filterCountryCode);

    setIdentifier(country.slice(0, 2));
    setFlagURL(url + identifier);
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
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/Michaeloye/currencies-name-and-code/main/currency-list.json"
      )
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div
      className="mx-auto h-48 w-11/12 border-2 rounded-2xl flex items-center shadow-light
          text-primary-gray lg:w-96"
    >
      {/* Inputs */}
      <div className="ml-5 flex flex-col gap-5">
        {/* Input amount */}
        <span>
          {currencyCode.length ? (
            <span className="mr-1">
              {currencyCode.map((code) => code.symbol)}
            </span>
          ) : (
            ""
          )}
          <input
            type="text"
            inputMode="decimal"
            autoComplete="off"
            className="border-2 h-10 px-2 rounded-lg w-8/12"
          />
        </span>
        <div className="flex flex-row items-center gap-5">
          <input
            type="text"
            className="border-2 h-10 px-2 rounded-lg w-8/12"
            list="countries"
            value={inputValue}
            placeholder="Type to search..."
            onClick={() => setInputValue("")}
            onChange={(e) => setCountry(e.target.value)}
          />
          <datalist id="countries">
            {countries.map((country) => (
              <option key={country.name}>
                {country.code} - {country.name}
              </option>
            ))}
          </datalist>

          {imageAvailable && (
            <img src={flagURL} alt="Country flag" height={48} width={48} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrencyCard;
