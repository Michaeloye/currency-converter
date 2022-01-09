import React, { useState, useEffect } from "react";
import axios from "axios";

function CurrencyCard({ countryFlag }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/Kol007/e734eca54c241324f49691d6ed3424e4/raw/f621703926fc13be4f618fb4a058d0454177cceb/countries.json"
      )
      .then((response) => {
        console.log(response);
        setCountries(response.data.countries.country);
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
        <input type="text" className="border-2 h-10 px-2 rounded-lg w-8/12" />
        <div className="flex flex-row items-center gap-5">
          <input
            type="text"
            className="border-2 h-10 px-2 rounded-lg w-8/12"
            list="countries"
          />
          <datalist id="countries">
            {countries.map((country) => (
              <option key={country.countryName}>
                {country.currencyCode} - {country.countryName}
              </option>
            ))}
          </datalist>

          <img src={countryFlag} alt="Country flag" height={48} width={48} />
        </div>
      </div>
    </div>
  );
}

export default CurrencyCard;
