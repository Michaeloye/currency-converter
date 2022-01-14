import React from "react";

function CurrencyCard({
  countryFlag,
  data,
  currencyCode,
  inputValue,
  imageAvailable,
  setCountry,
  clearInput,
  amount,
  setAmount,
}) {
  return (
    <div
      className="mx-auto h-48 w-11/12 border-2 rounded-2xl flex items-center shadow-light
          text-primary-gray lg:w-96 bg-gray-50"
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
            type="number"
            inputMode="decimal"
            autoComplete="off"
            spellCheck="false"
            value={amount}
            className="border-2 h-10 px-2 rounded-lg w-8/12"
            onChange={setAmount}
          />
        </span>
        <div className="flex flex-row items-center gap-5">
          <input
            type="text"
            className="border-2 h-10 px-2 rounded-lg w-8/12"
            list="countries"
            value={inputValue}
            placeholder="Type to search..."
            onClick={clearInput}
            onChange={setCountry}
          />
          <datalist id="countries">
            {data.map((country) => (
              <option key={country.name}>
                {country.code} - {country.name}
              </option>
            ))}
          </datalist>

          {imageAvailable && (
            <img src={countryFlag} alt="Country flag" height={48} width={48} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrencyCard;
