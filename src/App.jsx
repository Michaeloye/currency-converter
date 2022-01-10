import React, { useState } from "react";
import "./App.css";
import Header from "./components/header";
import CurrencyCard from "./components/currencyCard";
import { CgArrowsExchange } from "react-icons/cg";

function App() {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col items-center md:gap-7 md:mt-7 md:flex-row md:justify-center">
        <div>
          <p className="text-primary-gray font-medium mt-3 md:mt-auto ml-5 mb-1 ">
            From
          </p>
          <CurrencyCard />
        </div>
        <div
          className="bg-primary-red h-12 w-12 mt-5 md:mt-0 flex justify-center items-center rounded-full 
          cursor-pointer shadow-light hover:bg-red-400"
        >
          <CgArrowsExchange color="white" size="33" />
        </div>
        <div>
          <p className="text-primary-gray font-medium ml-5 mb-1 ">To</p>
          <CurrencyCard />
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
