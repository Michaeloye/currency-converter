import React from "react";
import usa from "../../../../../Downloads/icons8-usa-48.png";

function CurrencyCard() {
  return (
    <div
      className="mx-auto h-48 w-11/12 border-2 rounded-2xl flex items-center shadow-light
          text-primary-gray"
    >
      {/* Inputs */}
      <div className="ml-5 flex flex-col gap-5">
        <input type="text" className="border-2 h-10 px-2 rounded-lg w-8/12" />
        <div className="flex flex-row items-center gap-5">
          <select className="bg-white h-10 border-2 rounded-lg w-8/12">
            <option>USD - US Dollar</option>
          </select>
          <img src={usa} alt="usa flag" />
        </div>
      </div>
    </div>
  );
}

export default CurrencyCard;
